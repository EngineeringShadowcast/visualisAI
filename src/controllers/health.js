/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const service = require("../service/health");

/**
 * @description  - Get service health
 * @returns {object} - Return health data
 */
exports.getServiceHealth = (req, res) => {
  service.getServiceHealth(req, res);
};

/**
 * @description  - Get service health all
 * @returns {object} - Return health data
 */
exports.getHealthAll = (req, res) => {
  service.getServiceHealth(req, res);
};

/**
 * @description  - Get Redis health
 * @returns {object} - Return Redis health data
 */
exports.getRedisHealth = (res) => {
  try {
    // TODO: yet to define
  } catch (err) {
    console.log("error in getRedisHealth");
  }
};

/**
 * @description  - Get DB health
 * @returns {object} - Return DB health data
 */
exports.getDBHealth = (res) => {
  try {
    // TODO: yet to define
  } catch (err) {
    console.log("error in getDBHealth");
  }
};

exports.testRedis = async (req, res, next) => {
  try {
    await service.testRedis(req, res, next);
  } catch (err) {
    console.log("error in testRedis");
  }
};

exports.testRedisGet = async (req, res, next) => {
  try {
    await service.testRedisGet(req, res, next);
  } catch (err) {
    console.log("error in testRedisGet");
  }
};
