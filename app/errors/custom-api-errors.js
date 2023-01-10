class CustomApiError extends Error {
  constructor(m) {
    super(m);
  }
}

module.exports = CustomApiError;
