/*
 *  Copyright 2023 Shadowcast
 *  Project - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

var nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply@Sheepdog-therapeutics.com",
    pass: process.env.EMAIL_SECRET,
  },
});


async function trigger_email(email, code, title, type, message) {

  let template = emailTemplate(message, title);
  // Define the email options
  const mailOptions = {
    from: "noreply@Sheepdog-therapeutics.com",
    to: email,
    subject: title,
    html: template,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: with code", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


  function emailTemplate(message,title) {
    // Replace each period (.) with a newline character (\n)
    const formattedMessage = message.replace(/\./g, '.<br>');
  
    // let template = `
    //   <!DOCTYPE html>
    //   <html lang="en-US">
      
    //   <head>
    //       <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    //       <style type="text/css">
    //           a:hover {text-decoration: underline !important;}
    //       </style>
    //   </head>
      
    //   <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    //       ${formattedMessage}
    //   </body>
      
    //   </html>
    // `;
    
    let template = `<!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>${title}</title>
     
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to our platform</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                ${formattedMessage} <br/>
                                                Team Sheepdog Therapeutics
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`
    return template;
  }
  
  
  
  





module.exports = {
  trigger_email,
};

