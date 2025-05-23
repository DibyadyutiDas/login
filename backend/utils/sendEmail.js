import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // Uncomment if you want to send HTML emails
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;