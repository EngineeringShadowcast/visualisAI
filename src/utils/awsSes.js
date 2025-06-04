/*
 *  Copyright 2023 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const {
  helpCenterNotificationEmailTemplate,
  verificationEmailTemplate,
  forgotPasswordEmailTemplate,
  generalEmailTemplate,
  forgotPasswordEmailTemplateNew,
  successfulPasswordUpdateEmailTemplate
} = require("./emailTemplate");

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

// SES service object
const sesClient = new SESClient(SES_CONFIG);

// Mail options
const mailOptions = (email, emailTemplate, title) => {
  return {
    Source: process.env.ADMIN_NO_REPLY_EMAIL,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailTemplate,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: title,
      },
    },
  };
};

exports.sendNotificationMail = async (email, title, message, data) => {
  console.log("data", data);
  let emailTemplate = await helpCenterNotificationEmailTemplate(
    message,
    title,
    data
  );

  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};

exports.sendVerificationMail = async (_email, otp) => {
  //? Note: we are replacing the ADMIN1_EMAIL from env for the testing
  let emailTemplate = await verificationEmailTemplate(otp);
  const title = "OTP For Email Verfication";
  const email = process.env.ADMIN1_EMAIL;
  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};

exports.sendForgotPasswordMail = async (email, passwordResetToken) => {
  let emailTemplate = await forgotPasswordEmailTemplate(passwordResetToken);

  const title = "OTP For Forgot Password";

  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};



exports.sendForgotPasswordMailNew = async (email,name, passwordResetToken,password) => {
  let emailTemplate = await forgotPasswordEmailTemplateNew(passwordResetToken,password,name);

  const title = "Link For Forgot Password";

  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};


exports.successfulPasswordUpdateEmailTemplate = async (name,email) => {
  let emailTemplate = await successfulPasswordUpdateEmailTemplate(name);

  const title = "Notification For Password Update";

  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};


//-------------------------------General Notification---------------------------
exports.sendGeneralNotificationMail = async (
  email,
  title,
  messageHeading,
  message
) => {
  console.log("in awsses", email, title, messageHeading, message);
  let emailTemplate = await generalEmailTemplate(
    title,
    messageHeading,
    message
  );

  let mailOption = mailOptions(email, emailTemplate, title);

  try {
    const sendEmailCommand = new SendEmailCommand(mailOption);
    const res = await sesClient.send(sendEmailCommand);
    console.log("Email sent: " + res);
  } catch (error) {
    console.log(error);
  }
};
