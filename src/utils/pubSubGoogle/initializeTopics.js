
const {subscribeToMessages}=require('./pubSubFunctions')

/**
 * Subscribes to multiple topics and their corresponding subscriptions.
 *
 * @param {Array} subscriptions - An array of objects containing the topicName and subscriptionName.
 * @return {Promise} - A promise that resolves when all subscriptions are set up.
 */
async function subscribeToMultiple(subscriptions) {
    const promises = subscriptions.map(sub => subscribeToMessages(sub.topicName, sub.subscriptionName));
    await Promise.all(promises);
    console.log('All subscriptions are set up.');
  }


  module.exports={subscribeToMultiple}
