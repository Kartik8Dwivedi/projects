import { ASTNode, combineRules, evaluateAST, parseRuleToAST } from "../helpers/ast.node.js";
import Rule from "../model/rule.schema.js";

import { createRuleRepository, getRuleByIdRepository, getRulesRepository, updateRuleRepository } from "../repository/server.repository.js";

export async function createRule(req){
    try {
        const { ruleString, ruleName, description } = req.body;

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

export async function evaluateRule(ruleId, attributes){
    try {
      const rule = await Rule.findById(ruleId);

      if (!rule) {
        throw new Error("Rule not found");
      }

      const result = evaluateAST(rule.ast, attributes); // Assuming you have the evaluateAST function



    //   const rules = await getRulesRepository();
    //   const combinedAST = combineRules(rules.map((rule) => rule.ruleString));
    //   const result = evaluateAST(combinedAST, attributes);
      return result;
    } catch (error) {
        console.log("Error in evaluating rule in service layer", error);
        throw error;
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


    const validateSingleRule = (rule) => {
        const ruleRegex = /^[A-Z]+\s+.+\s+WHERE\s+.+$/i;

        if (!ruleRegex.test(rule)) {
        throw new Error(`Invalid rule syntax for single rule: ${rule}`);
        }
    };