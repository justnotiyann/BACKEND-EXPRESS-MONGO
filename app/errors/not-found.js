const CustomApiError = require("./custom-api-errors");
const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomApiError {
  constructor(m) {
    super(m);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
