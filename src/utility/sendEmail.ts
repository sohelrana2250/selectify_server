import nodemailer from 'nodemailer';
import config from '../app/config';

//https://nodemailer.com/
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.send_email.nodemailer_email,
      pass: config.send_email.nodemailer_password,
    },
  });

  
  await transporter.sendMail({
    from: config.send_email.nodemailer_email,
    to,
    subject: 'Selectify Send This Email',
    text: 'Reset your password with in 10 mins',
    html,
  });
};
