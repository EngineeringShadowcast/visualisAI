/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */
require("dotenv").config();

const Redis = require("ioredis");
const redisUrl = process.env.REDIS_URL;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const redis = new Redis(redisPort, redisHost)
  .on('error', err => console.log('Redis Client Error', err))
  .on('connect', () => console.log('Redis connected'))

module.exports = redis;