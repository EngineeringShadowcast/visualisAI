/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const { sendResponse } = require("../utils/responseHandler");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log("error", err.stack);
  error.message = err.message;

  // Error log for dev
  console.log(`caughted error in errorResponse: ${error.message}`);

  if (err.statusEnum == undefined) {
    sendResponse(res, {}, 500, err.message, 1, 0);
  } else {
    sendResponse(res, {}, err.statusCode, err.message, err.errorCode, err.statusEnum);
  }
  
};

module.exports = errorHandler;
