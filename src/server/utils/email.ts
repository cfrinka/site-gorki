import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Change as needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendTicketEmail(
  to: string,
  subject: string,
  text: string,
  qrCodeDataUrl: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html: `<p>${text}</p><img src="${qrCodeDataUrl}" alt="QR Code" />`,
  };
  return transporter.sendMail(mailOptions);
}
