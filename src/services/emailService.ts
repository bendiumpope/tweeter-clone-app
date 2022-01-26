import dotevn from "dotenv";
import sgMail from "@sendgrid/mail";
import AppError from "../utils/http-error";
import HttpError from "../utils/http-error";

dotevn.config();

const URL = process.env.URL;
const SendGrid_key: any = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_EMAIL;

sgMail.setApiKey(SendGrid_key);

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (reciever: string, subject: string, text: string) => {
  const msg: any = {
    to: reciever,
    from: fromEmail,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (err) {
    console.log("err is from here", err);
    throw new HttpError("an error occured", 500);
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

  await sendEmail(to, subject, text);
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

  await await sendEmail(to, subject, text);
};
