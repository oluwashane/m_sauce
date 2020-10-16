class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  res.redirect('/api/v1/api-docs');
};

module.exports = {
  ErrorHandler,
  handleError,
};
