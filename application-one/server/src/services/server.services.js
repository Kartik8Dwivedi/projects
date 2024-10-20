import CustomError from "../helpers/CustomError.js";
import { ASTNode, combineRules, evaluateAST, parseRuleToAST } from "../helpers/ast.node.js";
import { combineRulesHelper } from "../helpers/combineRules.js";
import { combineRulesEvaluate, evaluateASTTree } from "../helpers/evaluate.js";
import { parseRule } from "../helpers/parseRule.js";
import Rule from "../model/rule.schema.js";

import { createRuleRepository, getRuleByIdRepository, getRulesRepository, updateRuleRepository } from "../repository/server.repository.js";

export async function createRule(req){
    try {
        console.log(req.body);
        const { ruleString, ruleName, description } = req.body;

        if(!ruleString){
            throw new Error("Rule cannot be empty");
        }

        validateSingleRule(ruleString);

        const existingRule = await Rule.findOne({ ruleString: ruleString.trim() });


        if (existingRule) {
            throw new Error("Rule already exists");
        }

        const ast = parseRuleToAST(ruleString);


        let result = createRuleRepository(
          ruleString,
          ast,
          ruleName,
          description
        );

        return result;
    } catch (error) {
        console.log("Error in creating rule in service layer", error);
        throw error;
    }
}

export async function getRules(){
    try {
        let result =  await getRulesRepository();
        return result;
    } catch (error) {
        console.log("Error in getting rules in service layer", error);
        throw error;
    }
}

export async function getRuleById(id){
    try {
        let result = await getRuleByIdRepository(id);
        return result;
    }
    catch (error) {
        console.log("Error in getting rule by id in service layer", error);
        throw error;
    }
}

export async function evaluateRule(ruleIds, attributes) {
  try {
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    if (rules.length === 0) {
      throw new CustomError("No valid rules found for the provided IDs", 404);
    }

    // Extract rule strings from the retrieved rules
    const ruleStrings = rules.map((rule) => rule.ruleString);

    // Combine the rules into a single condition string
    const combinedCondition = combineRulesFunction(ruleStrings);

    // Evaluate the combined condition with attributes
    const result = evaluateCondition(combinedCondition, attributes);

    return result;
  } catch (error) {
    console.log("Error in evaluating rule in service layer", error);
    throw error;
  }
}

// Helper function to combine rule strings into a single condition
function combineRulesFunction(ruleStrings) {
  // Here, you might want to implement logic to combine the rule strings
  // based on your specific requirements. For simplicity, let's join them with OR.
  return ruleStrings.join(" || "); // Or use a different strategy based on your needs
}

// Your evaluateCondition function
function evaluateCondition(condition, attributes) {
  const sanitizedCondition = condition
    .replace(/AND/g, "&&")
    .replace(/OR/g, "||")
    .replace(/=/g, "==")
    .replace(/(?<!\w)([a-zA-Z_]\w*)(?!=)/g, (match) => {
      return attributes.hasOwnProperty(match) ? attributes[match] : `undefined`;
    });

  try {
    return eval(sanitizedCondition);
  } catch (error) {
    console.error("Error evaluating condition:", error);
    return false;
  }
}

export async function updateRule(ruleString, ruleName, description, id){
    try {
            const ast = parseRuleToAST(ruleString);
            let result = await updateRuleRepository(
                id,
                ruleString,
                ast,
                ruleName,
                description
            );
            if(!result){
                throw new Error("Rule not found");
            }
            return result;
    } catch (error) {
        console.log("Error in updating rule in service layer", error);
        throw error;
    }
}

export async function deleteRule(id){
    try {
        // check if rule exists:
        const rule = await getRuleByIdRepository(id);
        if (!rule) {
            throw new Error("Rule not found");
        }

        const deletedRule = await Rule.findByIdAndDelete(id);
        if (!deletedRule) {
            throw new Error("Rule not found");
        }

        return deletedRule;
    } catch (error) {
        
    }
}

export async function combineTrees(ruleStrings) {
  try {
    // Combine the rules into a single AST
    const combinedAST = combineRulesHelper(ruleStrings);

    // Create a new Rule entry with the combined AST
    const newRule = new Rule({
      ruleString: ruleStrings.join(" AND "),
      ast: combinedAST,
      ruleName: "Combined Rule",
      description: "A rule combined from multiple rules",
    }); 

    // check if this rule is already in the tree then don't save it to the database and send proper error message
    const existing = await Rule.findOne({ ruleString: newRule.ruleString });
    if (existing) {
      throw new Error("Rule already exists");
    }

    const savedRule = await newRule.save();

    return savedRule;
  } catch (error) {
    console.log("Error in combining rules in service layer", error);
    throw error;
  }
}


    const validateSingleRule = (rule) => {
        // const ruleRegex = /^[A-Z]+\s+.+\s+WHERE\s+.+$/i;

        // if (!ruleRegex.test(rule)) {
        // throw new Error(`Invalid rule syntax for single rule: ${rule}`);
        // }
    };

    const combineRulesInOne = (ruleStrings) => {
        const asts = ruleStrings.map((rule) => parseRule(rule));

        // Combine two ASTs using the AND operator
        const combineTwoASTs = (ast1, ast2) => {
          const combinedAST = {
            type: "operator",
            value: "AND",
            left: ast1,
            right: ast2,
          };
          return combinedAST;
        };

        // Combine all ASTs into one
        let combinedAST = asts[0];
        for (let i = 1; i < asts.length; i++) {
          combinedAST = combineTwoASTs(combinedAST, asts[i]);
        }

        return combinedAST;
    }

    const evaluateAllASTTrees = (ast,attributes) => {
        if (ast.type === "operand") {
          const condition = ast.value;
          return evalCondition(condition, attributes);
        }

        if (ast.type === "operator") {
          const leftResult = evaluateAST(ast.left, attributes);
          const rightResult = evaluateAST(ast.right, attributes);

          if (ast.value === "AND") {
            return leftResult && rightResult;
          } else if (ast.value === "OR") {
            return leftResult || rightResult;
          }
        }

        return false;
    }

    const evalCondition = (condition, attributes) => {
      const evaluatedCondition = condition.replace(/\b\w+\b/g, (match) => {
        return attributes.hasOwnProperty(match) ? attributes[match] : match;
      });

      try {
        return eval(evaluatedCondition);
      } catch (error) {
        console.error("Error evaluating condition:", error);
        return false;
      }
    };