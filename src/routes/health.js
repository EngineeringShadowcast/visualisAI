/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const express = require("express");
const {
  getServiceHealth,
  getHealthAll,
  testRedis,
  testRedisGet,
} = require("../controllers/health");

const router = express.Router();

// Health node route
router.get("/node", getServiceHealth);
// Health all route
router.get("/all", getHealthAll);

router.post("/test-redis-set", testRedis);
router.get("/test-redis-get/:key", testRedisGet);
// Redis health route
// router.get("/redis", );
// Database health route
// router.get("/database",)

module.exports = router;
