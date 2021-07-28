class BaseError extends Error {
  /**
   * Base error constructor
   *
   * @param {String} message Error description
   * @param {number} statusCode Status code
   * @param {number} code Error code
   */
  constructor(error, statusCode) {
    super(error);
    // Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = error;
    this.statusCode = statusCode;
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

class AuthorizationError extends BaseError {
  constructor(error, statusCode = 401) {
    super(error, statusCode);
  }
}

class FieldError {
  constructor(param, msg) {
    return {param: param, msg: msg}
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    const errorBody = {
      code: error.statusCode,
      [Array.isArray(error.message) ? 'errors' : 'error']: error.message,
    };
    res.status(error.statusCode).send(errorBody);
    return;
  }
  res.status(500).send(error);
  return;
};

module.exports = {
  BaseError,
  AuthorizationError,
  BadRequestError,
  ValidationError,
  NotFoundError,
  FieldError,
  errorHandler,
};
