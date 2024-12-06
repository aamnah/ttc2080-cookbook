function returnError(errorCode, errorMessage) {
  // use `if ("error" in response) {}` to check if there is an error.
  return {
    error: {
      code: errorCode,
      message: errorMessage,
    },
  };
}
function returnData(data) {
  return {
    data: data,
  };
}

module.exports = { returnError, returnData };
