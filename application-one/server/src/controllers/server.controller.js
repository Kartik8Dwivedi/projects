import { appError, appSuccess } from "../config/server.response.js";


class ServerController {

    async default_ (req,res) {
        try {
            return appSuccess(res,200, {}, "Server is up and running");
        } catch (error) {
            console.log(error);
            return appError(res, 500, error, "Internal server error");
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