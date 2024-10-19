export const appError = (obj) => {
    let { res, statusCode, error, message } = obj;
    if (!statusCode) statusCode = 500;
    if(!error) error = {};
    if(!message) message = "Internal server error";
  return res.status(statusCode).json({
    status: "failure",
    data: {},
    error,
    message,
  });
};

export const appSuccess = (obj) => {
    let {res, statusCode, data, message} = obj;
    if (!statusCode) statusCode = 200;
    if(!data) data = {};
    if(!message) message = "Success";
  return res.status(statusCode).json({
    status: "success",
    data,
    error: {},
    message,
  });
};
