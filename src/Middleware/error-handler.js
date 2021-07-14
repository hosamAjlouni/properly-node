class BaseError extends Error {
  /**
   * Base error constructor
   *
   * @param {String} message Error description
   * @param {number} statusCode Status code
   * @param {number} code Error code
   */
  constructor(error, statusCode, code) {
    super(error);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = error;
    this.statusCode = statusCode;
    this.code = code;
  }
}

class NotFoundError extends BaseError {
  constructor(error, statusCode = 404) {
    super(error, statusCode);
  }
}

class ValidationError extends BaseError {
  constructor(error, statusCode = 400) {
    super(error, statusCode);
  }
}

class BadRequestError extends BaseError {
  constructor(error, statusCode = 400) {
    super(error, statusCode);
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    const errorBody = {
      code: error.statusCode,
      error: error.message,
    };
    res.status(error.statusCode);
    res.send(errorBody);
    return;
  }
  res.status(500);
  res.send(error);
  return;
};

module.exports = {
  BaseError,
  BadRequestError,
  ValidationError,
  NotFoundError,
  errorHandler,
};
