/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const {messageLookupError}=require("./errorCodeList")



const messageLookup = {
  200: "Ok",
  201: "Created Successfully",
  202: "Accepted",
  204: " No Content",
  301: "Moved Permanently",
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  422: "unprocessable entity",
  500: "Internal Server Error"
 


};




/**
 * It sends the response
 * @param {*} res
 * @param {*} data
 * @param {*} statusCode
 * @param {*} message
 * @param {*} errorCode
 * @param {*} statusEnum
 *@returns {object} statuscode,message,errorCode,statusEnum,data
 */
exports.sendResponse = (res, data,statusCode, message,errorCode,statusEnum) => {
 
  res.status(statusCode).json({
    statusCode,
    message: messageLookup[statusCode],
    response: {
      errorCode: errorCode,
      statusEnum: statusEnum,
      message: messageLookupError[errorCode] || message,
      data: data,
    },
  });
};

