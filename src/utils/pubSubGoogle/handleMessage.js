/*
 *  Copyright 2024 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

// Function to handle incoming messages based on topic
function handleMessage(topic, message) {
  try {
    // Implement message processing logic based on the topic
    switch (topic) {
      case "payment-admin":
        console.log(`Handling message from ${topic} topic: ${message}`);
        // Process user-related message
        break;
      default:
        console.log(
          `Received message from unknown topic '${topic}': ${message}`
        );

      // Handle messages from other topics (if needed)
    }
  } catch (err) {
    console.log("catcher", err);
  }
}

module.exports = { handleMessage };
