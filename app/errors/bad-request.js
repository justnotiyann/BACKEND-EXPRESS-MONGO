const CustomApiError = require("./custom-api-errors");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomApiError {
  constructor(m) {
    super(m);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
