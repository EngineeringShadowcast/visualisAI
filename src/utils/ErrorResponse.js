/*
 *  Copyright 2023 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode, statusEnum) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.statusEnum = statusEnum;
  }
}

module.exports = ErrorResponse;
