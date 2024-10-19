import { appError, appSuccess } from "../config/server.response.js";
import {
  createRule,
  getRules,
  evaluateRule,
  updateRule,
  getRuleById,
  deleteRule,
  combineTrees,
} from "../services/server.services.js";


class ServerController {

    async default_ (req,res) {
        try {
            return appSuccess(res,200, {}, "Server is up and running");
        } catch (error) {
            console.log(error);
            return appError(res, 500, error, "Internal server error");
        }
    }

    async create (req,res) {
        try {
          const savedRule = await createRule(req);
          return appSuccess(res, 200, savedRule, "Rule added successfully");
        } catch (error) {
          console.log(error);
          return appError(res, 500, error, error.message || "Error in adding rule");
        }
    }

    async getRules(req,res) {
        try {
          let rules = await getRules();
          return appSuccess(res, 200, rules, "All rules fetched successfully");
        } catch (error) {
          console.log(error);
          return appError(res, 500, error, "Internal server error");
        }
    }
    
    async getRuleById(req,res) {
        try {
          let rule = await getRuleById(req.params.id);
          return appSuccess(res, 200, rule, "Rule fetched successfully");
        } catch (error) {
          console.log(error);
          return appError(res, 500, error, "Internal server error");
        }
    }

    async evaluateRule(req,res) {
        try {
            const { attributes, ruleIds } = req.body; 

            // Validate input
            if (!attributes || typeof attributes !== "object") {
                return res.status(400).json({ 
                    error: "Invalid input. Expected user attributes object.",
                    message: "Invalid input. Expected user attributes object.",
                    success: false,
                    result: false
                });
            }
            if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length === 0) {
                return res.status(400).json({ 
                    error: "Invalid input. Expected an array of rule ids.",
                    message: "Invalid input. Expected an array of rule ids.",
                    success: false,
                    result: false
                });
            }
            let evaluationResult = await evaluateRule(ruleIds, attributes);
            return appSuccess(res, 200, evaluationResult, "Rules evaluated successfully");
        } catch (error) {
            console.error("Error evaluating rules:", error);

            return res.status(500).json({ error: error.message,
                message: "Internal server error",
                success: false,
                result: false
             });
        }
    }

    async updateRule(req,res) {
        try {
            const { ruleString, ruleName, description } = req.body;
            let result = await updateRule(
              ruleString,
              ruleName,
              description,
              req.params.id
            );
            return appSuccess(res, 201, result, "Rule updated successfully");
        } catch (error) {
            console.log(error);
            return appError(res, 500, error, error.meesage || "Internal server error");
        }
    }

    async combineRules(req,res) {
        try {
              const {ruleStrings} = req.body; 

              if (
                !ruleStrings ||
                !Array.isArray(ruleStrings) ||
                ruleStrings.length === 0
              ) {
                return appError(
                  res,
                  400,
                  ruleStrings,
                  "Invalid input. Provide an array of rule strings."
                );
            }
            let combinedResult = await combineTrees(ruleStrings);
            return appSuccess(res, 200, combinedResult, "Rules combined successfully");

        } catch (error) {
          console.error("Error combining rules:", error);
            return appError(res, 500, error, error.message || "Internal server error");
        }
    }

    async deleteRule(req,res) {
        try {
            let deletedRule = await deleteRule(req.params.id)
            return appSuccess(res, 200, deletedRule, "Rule deleted successfully");
        } catch (error) {
            console.error("Error deleting rule:", error);
            
            return appError(res, 500, error, error.message || "Internal server error");
        }
    }
}

export default ServerController;


/**
 *      

    appError and appSuccess are functions that are used to send responses to the client.

    appSuccess requires the following parameters:
    res: The response object
    successCode: The success code to be sent
    data: The data to be sent to the client
    message: The message to be sent to the client

    appError requires the following parameters:
    res: The response object
    errorCode: The error code to be sent
    error: The error object
    message: The message to be sent to the client
 
 * 
 */