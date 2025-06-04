/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const { performance } = require("perf_hooks");
const redis = require("../config/redis.config");
const { sendResponse } = require("../utils/responseHandler");
// Get service health
exports.getServiceHealth = (req, res) => {
  try {
    // Mark point one
    const t1 = performance.now();

    // Mark point two
    const t2 = performance.now();
    // Measure response time from point one to point two
    const measuredTime = t2 - t1; // in ms
    const responseTime = measuredTime.toFixed(6);
    return res.status(200).json({
      responseTime,
      status: "active",
      serviceName: "model-service",
    });
  } catch (err) {
    console.log("error in getServiceHealth");
    return res.status(500).json({
      error: err,
    });
  }
};

/**
 * Saves data to Redis using the provided key.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} userEquip - The user equipment object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} A promise that resolves to the response object
 */
exports.testRedis = async (req, res, next) => {
  try {
    // let selectUser = req.user.id;

    //response check
    let { data, key } = req.body;

    // user will hit this api via user indexing service
    // the current clothing and avatar equipment data will be fetched for the user
    // let data = { name: "mr hellow", email: "hellow@shdajs,sj", hobby: "chess" };
    // Example usage
    console.log(typeof data, "data check");
    if (typeof data === "string") {
      await redis.set(key, data);
      return sendResponse(res, null, 200, "Redis saved inside", 0, 1);
    }
    const jsonString = JSON.stringify(data);
    await redis.set(key, jsonString);
    return sendResponse(res, null, 200, "Redis saved outside", 0, 1);
  } catch (err) {
    console.log(err, "catch err");
    next(err);
  }
};

/**
 * Retrieves data from Redis using the provided key and sends the result in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} userEquip - The user equipment object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} A promise that resolves to the response object.
 */
exports.testRedisGet = async (req, res, next) => {
  try {
    let { key } = req.params;
    await redis.get(key, (err, result) => {
      if (err) {
        // console.log('err from redis callback', err);
        return next(err);
        // return sendResponse(res, null, 200, err.message, 0, 1);
      } else {
        console.log(typeof result, "result type");
        // console.log("result value:", result);

        if (typeof result === "string") {
          //  redis.set("K2", result);
          return sendResponse(res, result, 200, "Redis get", 0, 1);
        }

        const retrievedObject = JSON.parse(result);
        console.log("Value:", retrievedObject);
        return sendResponse(
          res,
          retrievedObject,
          200,
          "Redis get outside",
          0,
          1
        );
      }

      // Close the Redis connection when done
      // redis.quit();
    });
  } catch (err) {
    console.log(err, "catch err");
    next(err);
  }
};
