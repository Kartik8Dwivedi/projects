import Rule from "../model/rule.schema.js";

export const createRuleRepository = async (
  ruleString,
  ast,
  ruleName = "unnamed Rule",
  description = ""
) => {
  try {
    const newRule = new Rule({
      ruleString,
      ast,
      ruleName: ruleName,
      description: description,
    });

    let savedRule = await newRule.save();

    return savedRule;
  } catch (error) {
    console.log("Error in creating rule repository", error);
    throw error;
  }
};

export const getRulesRepository = async () => {
    try {
        let rules = await Rule.find();
        return rules;
    } catch (error) {
        console.log("Error in getting rules repository", error);
        throw error;
    }
}

export const getRuleByIdRepository = async (id) => {
    try {
        let rule = await Rule.findById(id);
        return rule;
    }
    catch (error) {
        console.log("Error in getting rule by id in repository layer", error);
        throw error;
    }
}

export const updateRuleRepository = async (
  id,
  ruleString,
  ast,
  ruleName,
  description
) => {
    try {
        const updatedRule = await Rule.findByIdAndUpdate(
            id,
            { ruleString, ast, ruleName, description },
            { new: true }
        );

        return updatedRule;
    } catch (error) {
        console.log("Error in updating rule repository", error);
        throw error;
    }
};
