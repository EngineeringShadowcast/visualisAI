/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */
// require("newrelic");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middleware/error");
require("dotenv").config();

// Routes

const modelRoutes = require("./routes/modelRoute");
const healthRoute = require("./routes/health");

const { sendResponse } = require("./utils/responseHandler");
const subscriptions = require("./utils/pubSubGoogle/subscriptionTopics");
const {
  subscribeToMultiple,
} = require("./utils/pubSubGoogle/initializeTopics");
// cron running
const cronDaily = require("./common/cronDaily/cronDaily");

const app = express();

// Sanitize data.
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Body parser
app.use(express.json());

// Payload limiter
app.use(express.json({ limit: "500mb" }));


// Mount routers
app.use("/api/v1/model", modelRoutes);
app.use("/api/v1/content/health", healthRoute);

// Error Handler
app.use(errorHandler);

// Initialize the Google subscriber to subscribe to multiple channels
subscribeToMultiple(subscriptions).catch(console.error);

module.exports = app;
