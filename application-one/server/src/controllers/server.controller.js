import { appError, appSuccess } from "../config/server.response.js";
import {
  createRule,
  getRules,
  evaluateRule,
  updateRule,
  getRuleById,
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
            const { attributes } = req.body;
            if (!attributes) {
                return appError(res, 400, {}, "Invalid input. Expected user attributes.");
            }
            const result = await evaluateRule(attributes);
            return appSuccess(res, 200, result, "Rule evaluated successfully");
        } catch (error) {
            console.log(error);
            return appError(res, 500, error, "Internal server error");
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