import nodemailer from 'nodemailer';
import { MAIL_PASSWORD, MAIL_USERNAME } from './config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

export const sendMail = async (
  to: string | string[],
  subject: string,
  text: string
) => {
  try {
    await transporter.sendMail({
      from: MAIL_USERNAME,
      to,
      subject,
      text,
    });

  } catch (error: unknown) {
    throw new Error(`Could not send email, error: ${error}`);
  }
};
