/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const { PubSub } = require("@google-cloud/pubsub");

const path = require("path");

const { handleMessage } = require("./handleMessage");
// // Path to your service account key file
// let keyFilename = process.env.GOOGLEAPICREDENTIALS

// keyFilename=JSON.parse(keyFilename)
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS, "GOOGLE_APPLICATION_CREDENTIALS");
// // // Set environment variable for Application Default Credentials
// process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFilename;

// Imports the Google Cloud client library
const pubsub = new PubSub({
  // projectId: keyFilename.project_id,
  // credentials: keyFilename,
});

/**
 * Ensures that a topic with the given name or ID exists in the Pub/Sub service.
 *
 * @param {string} topicNameOrId - The name or ID of the topic to ensure exists.
 * @return {Promise<void>} - A promise that resolves when the topic is ready or rejects with an error.
 */
async function ensureTopicExists(topicNameOrId) {
  try {
    await pubsub.topic(topicNameOrId).get({ autoCreate: true });
    console.log(`Topic ${topicNameOrId} is ready.`);
  } catch (error) {
    console.error(`Error ensuring topic exists: ${error.message}`);
    throw error;
  }
}

/**
 * Publishes a message to a topic in the Pub/Sub service.
 *
 * @param {string} topicNameOrId - The name or ID of the topic to publish to.
 * @param {any} data - The data to be published as a string or an object.
 * @return {Promise<void>} - A promise that resolves when the message is published successfully, or rejects with an error.
 */
async function publishMessage(topicNameOrId, data) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)

  try {
    let stringData = JSON.stringify(data);
    const dataBuffer = Buffer.from(stringData);
    // Ensure the topic exists
    await ensureTopicExists(topicNameOrId);

    const messageId = await pubsub
      .topic(topicNameOrId)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

/**
 * Ensures that a topic with the given name exists in the Pub/Sub service.
 *
 * @param {string} topicName - The name of the topic to ensure exists.
 * @return {Promise<Object>} - A promise that resolves to the topic object if it exists or is created, or rejects with an error.
 */
async function ensureTopicExistsSubs(topicName) {
  const topic = pubsub.topic(topicName);
  const [exists] = await topic.exists();
  if (!exists) {
    await pubsub.createTopic(topicName);
    console.log(`Created topic ${topicName}.`);
  } else {
    console.log(`Topic ${topicName} already exists.`);
  }
  return topic;
}

/**
 * Subscribes to messages from a Pub/Sub topic.
 *
 * @param {string} topicName - The name of the Pub/Sub topic.
 * @param {string} subscriptionName - The name of the subscription to create or use.
 * @return {Promise<void>} - A promise that resolves when the subscription is ready to receive messages.
 */
async function subscribeToMessages(topicName, subscriptionName) {
  const topic = await ensureTopicExistsSubs(topicName);
  let subscription;

  try {
    // Check if the subscription exists
    [subscription] = await topic
      .subscription(subscriptionName)
      .get({ autoCreate: false });
    console.log(`Using existing subscription ${subscriptionName}.`);
  } catch (err) {
    console.log(err.code, "err code");
    if (err.code === 5) {
      // 5 NOT_FOUND
      // Subscription doesn't exist, create a new one
      [subscription] = await topic.createSubscription(subscriptionName);
      console.log(`Created subscription ${subscriptionName}.`);
    } else {
      // Other errors
      console.error("Error while accessing subscription:", err);
      throw err;
    }
  }

  // Registers a listener for new messages
  subscription.on("message", (message) => {
    // Handle message
    handleMessage(topicName, message.data.toString());
    // Acknowledge the message
    message.ack();
  });

  // Receive callbacks for errors on the subscription
  subscription.on("error", (error) => {
    console.error("Received error:", error);
  });

  console.log(`Listening for messages on subscription ${subscriptionName}...`);
}
module.exports = { publishMessage, subscribeToMessages };
