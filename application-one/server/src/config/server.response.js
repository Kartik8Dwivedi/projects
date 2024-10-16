export const appError = (res, errorCode, error, message) => {
  return res.status(errorCode).json({
    status: "failure",
    data: {},
    error,
    message,
  });
};

export const appSuccess = (res, successCode, data, message) => {
  return res.status(successCode).json({
    status: "success",
    data,
    error: {},
    message,
  });
};
