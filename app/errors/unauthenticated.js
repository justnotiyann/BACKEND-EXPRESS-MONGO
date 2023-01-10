const CustomApiError = require("./bad-request");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomApiError {
  constructor(m) {
    super(m);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
