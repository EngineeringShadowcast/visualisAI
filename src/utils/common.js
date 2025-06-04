/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const randomstring = require("randomstring");
const { appConstant } = require("./constant");

/**
 * It sends the response
 * @param {*} res
 * @param {*} data
 * @param {*} message
 * @param {*} code
 * @param {*} status
 *
 *@returns {object} statuscode,message,data.status
 */
exports.sendResponse = (res, data, message, code, status) => {
  if (status == false) {
    status = false;
  } else {
    status = true;
  }
  res.status(code || 200).send({
    message,
    status,
    statusCode: code || 200,
    data,
  });
};

exports.sendResponseWithCount = (res, data, message, memento, code) => {
  res.status(code || 200).send({
    message,
    statusCode: code || 200,
    memento,
    data,
  });
};

/**
 * It sends the response
 * @param {*} res
 * @param {*} data
 * @param {*} message
 * @param {*} code
 * @param {*} status
 *
 *@returns {object} statuscode,message,data.status
 */
exports.sendARResponse = (res, jwt_auth, message, code, status) => {
  if (status == false) {
    status = false;
  } else {
    status = true;
  }
  res.status(code || 200).send({
    message,
    status,
    statusCode: code || 200,
    jwt_auth,
  });
};

exports.sendAccessTokenResponse = (
  res,
  data,
  message,
  accessToken,
  code,
  status
) => {
  if (status == false) {
    status = false;
  } else {
    status = true;
  }
  res.status(code || 200).send({
    data,
    status,
    message,
    accessToken,
    statusCode: code || 200,
  });
};

exports.sendMessageResponse = async (res, message, code, status) => {
  if (status == false) {
    status = false;
  } else {
    status = true;
  }
  res.status(code || 200).send({
    statusCode: code || 200,
    status,
    message,
  });
};

exports.catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err);
    return next(err);
  });
};

exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.getOtp = async (num) => {
  return randomstring.generate({
    length: num,
    charset: "numeric",
  });
};

exports.getChartData = async (num) => {
  return randomstring.generate({
    length: num,
    charset: "numeric",
  });
};

exports.generateRandomString = (length = 5) => {
  return Array.from({ length }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");
};

// Check ticketType
exports.validateTicket = (ticketType) => {
  if (
    ticketType == appConstant.ACCOUNT_SUPPORT ||
    ticketType == appConstant.REPORTED_BUGS ||
    ticketType == appConstant.FEATURE_REQUESTS
  ) {
    return true;
  } else {
    return false;
  }
};


/**
 * @description : This function is used to set the data in redis or kafka
 * @param app - {connection of app} redis or kafka
 * @param key - {string} key
 * @param value - {string} value
 * @param appType - {string} type of app redis or kafka
 * @param persistanceType - {string} type of persistance (important for future use 1 for persistance and 2,3,4 for depend on the requirement)
 * @returns {string} random string
 */
exports.dynamicDataSet = async (app, key, value, appType, persistanceType) => {
  if (appType === "redis") await app.set(key, value);
  if (persistanceType.includes("persistanceTime")) {
    // Set expiry for the key
    await app.expire(key, persistanceType[persistanceType.indexOf("persistanceTime") + 1]);
  }
  // same for kafka
  if (appType === "kafka") {
    // const producer = new Kafka.Producer({
    //   'metadata.broker.list': 'localhost:9092'
    // });
    // await producer.connect();
    // await producer.produce({
    //   topic: key,
    //   messages: [
    //     { value: 'Hello KafkaJS user!' },
    //   ],
    // });
    // await producer.disconnect();
  }
};

exports.dynamicDataGet = async (app, key, appType) => {
  if (appType === "redis") {
    try {
      return await app.get(key);
    } catch (err) {
      console.log(err);
    }
  }
  // same for kafka
  if (appType === "kafka") {
    //write code here
  }
};

exports.deleteKey = async (app, key, appType) => {
  if (appType === "redis") {
    try {
      let findKeyList = await app.keys(key);

      return await app.del(findKeyList);
    } catch (err) {
      console.log(err);
    }
  }
  // same for kafka
  if (appType === "kafka") {
    //write code here
  }
};




exports.getCustomDate = (numberOfDays) => {
  // Get the current date
  const currentDate = new Date();
  // Calculate the date for the specified number of days ago
  const customDate = new Date();
  customDate.setDate(currentDate.getDate() - numberOfDays);
  // Convert the custom date to the yyyy-mm-dd format
  const formattedDate = customDate.toISOString().substring(0, 10);
  return formattedDate;
}
exports.calculatePercentageChange=(newValue, oldValue)=> {
  // Calculate the difference between the new and old values
  const difference = newValue - oldValue;
  // Calculate the percentage change
  const percentageChange = (difference / oldValue) * 100;
  // Determine the sign of the percentage change
  const sign = Math.sign(difference);
  // Get the absolute value of the percentage change
  const absolutePercentageChange = Math.abs(percentageChange);
  // Make the absolute percentage change upto 1 decimal places
  let absolutePercentageChangeRounded = absolutePercentageChange.toFixed(1);

  if (isNaN(absolutePercentageChangeRounded)) {
    absolutePercentageChangeRounded=0
  }
  return { sign, percentageChange: absolutePercentageChangeRounded  };
}

// format email message with data
exports.formatEmailMessage = (message, data) => {

  let formattedMessage = message;
  console.log("message", message)
  // traverse message data with data length
  Object.entries(data).forEach(([key, value]) => {
    console.log('['+key+']', value);
    formattedMessage =  formattedMessage.replaceAll('['+key+']', value)
    console.log("traversing", formattedMessage)
  });

  return formattedMessage;
}