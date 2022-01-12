import nodemailer from "nodemailer";
import dotevn from "dotenv";
import sgMail from "@sendgrid/mail";

dotevn.config();

const forMailUser = process.env.GMAIL_USER;
const forMailPass = process.env.GMAIL_PASS;
const URL = process.env.URL;
const SendGrid_key: any = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_EMAIL;

sgMail.setApiKey(SendGrid_key);

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: forMailUser,
    pass: forMailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// /* istanbul ignore next */

transport
  .verify()
  .then(() => console.log("Connected to email server"))
  .catch(() =>
    console.log(
      "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
    )
  );

// const msg = {
//   to: "test@example.com",
//   from: "test@example.com", // Use the email address or domain you verified above
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// //ES6
// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// })();

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
export const sendEmail = async (msg: any) => {
  try {
    // await sgMail.send(msg);
    await transport.sendMail(msg);

  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
export const sendResetPasswordEmail = async (to: any, token: any) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${URL}/auth/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;

  const msg: any = {
    to: to,
    from: forMailUser, // Use the email address or domain you verified above
    subject: subject,
    text: text
  };
  await sendEmail(msg);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
export const sendVerificationEmailUser = async (to: any, token: any) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${URL}/auth/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  const msg: any = {
    to: to,
    from: forMailUser, // Use the email address or domain you verified above
    subject: subject,
    text: text
  };

  await sendEmail(msg);
};
