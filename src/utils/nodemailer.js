var nodemailer = require("nodemailer");
const {
  forgotPasswordEmailTemplate,
  verificationEmailTemplate,
  websiteLinkTemplate,
} = require("./emailTemplate");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply@Sheepdog-therapeutics.com",
    pass: process.env.EMAIL_SECRET,
  },
});

exports.sendForgotPasswordMail = async (email, otp) => {
  let emailTemplate = await forgotPasswordEmailTemplate(otp);
  let mailOptions = {
    from: "noreply@Sheepdog-therapeutics.com",
    to: email,
    subject: "OTP for Forgot Password",
    html: `${emailTemplate}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendVerificationMail = async (email, otp) => {
  let emailTemplate = await verificationEmailTemplate(otp);
  let mailOptions = {
    from: "noreply@Sheepdog-therapeutics.com",
    to: email,
    subject: "OTP for Email Verification",
    html: `${emailTemplate}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendWebsiteLinkMail = async (email) => {
  let emailTemplate = await websiteLinkTemplate();
  let mailOptions = {
    from: "noreply@Sheepdog-therapeutics.com",
    to: email,
    subject: "Sheepdog Therapeutics Website Link",
    html: `${emailTemplate}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
