/*
 *  Copyright 2023 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha, Vijayant Jha
 */

const NotificationModel = require("../../models/Notification");
const UserModel = require("../../models/User");
const user_notification_constants = require("./notificationUserCodes.json");
const { sendGeneralNotificationMail } = require("../awsSes");
const { formatEmailMessage } = require("../common");

async function createGeneralNotification(userId, notificationCode, data) {
  const notificationData = user_notification_constants.find(
    (notification) => notification.notification_code === notificationCode
  );

  if (!notificationData) {
    throw new Error("Invalid notification code");
  }

  try {
    // Format message with data
    const formattedTitle = formatEmailMessage(notificationData.title, data);
    const formattedMessageHeading = formatEmailMessage(notificationData.messageHeading, data);
    const formattedMessage = formatEmailMessage(notificationData.message, data);
    const formattedHTMLMessage = formatEmailMessage(
      notificationData.messageInHTML,
      data
    );

    // Save data to DB
    const newNotification = new NotificationModel({
      user_id: userId,
      notification_code: notificationData.notification_code,
      title: formattedTitle,
      message: formattedMessage,
      notification_type: notificationData.notification_type,
      image: notificationData.image,
      action_code: 0,
      in_system: notificationData.inSystem,
      email: notificationData.email,
      web_push: notificationData.webPush,
      android_push: notificationData.android_push,
      ios_push: notificationData.ios_push,
      sms: notificationData.sms,
      oculus_push: notificationData.oculus_push,
      whatsapp_send: notificationData.whatsapp_send,
    });

    await newNotification.save();

    if (newNotification.email) {
      await trigger_email_from_notification(
        userId,
        formattedTitle,
        formattedHTMLMessage,
        formattedMessageHeading
      );
    }
    if (newNotification.in_system) {
      trigger_in_system();
    }
    if (newNotification.web_push) {
      trigger_web_push();
    }

    return newNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

async function trigger_email_from_notification(
  userid,
  title,
  message,
  messageHeading
) {
  let user = await UserModel.findById(userid);

  if (user) {
    await sendGeneralNotificationMail(
      user.email,
      title,
      messageHeading,
      message
    );
  }
}
function trigger_in_system() {}
function trigger_web_push() {}

module.exports = { createGeneralNotification };
