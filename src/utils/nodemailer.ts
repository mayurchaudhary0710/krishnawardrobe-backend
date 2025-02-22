import * as nodemailer from "nodemailer";
import { EmailDTO } from "@dtos";
import { ENV } from "@config";


const nodeMailerConfig = ENV.NODEMAILER
const transporter = nodemailer.createTransport({
  host: nodeMailerConfig.HOST,
  port: nodeMailerConfig.PORT,
  auth: nodeMailerConfig.AUTH,
});

export const emailSender = async (emailData: EmailDTO) => {
  const contacts = {
    to: emailData.to,
    from: nodeMailerConfig.FROM_NAME,
    bcc: emailData.bcc,
  };
  const email = {
    ...emailData.content,
    ...contacts,
    ...(emailData?.attachments?.length && { attachments: emailData.attachments }),
  };
  try {
    const message = await transporter.sendMail(email);
    console.info("Email sent:", message.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// Verify the transporter (optional, for debugging)
transporter.verify((error: Error | null) => {
  if (error) {
    console.error("SMTP server verification failed:", error.message);
  } else {
    console.info("SMTP server is verified and ready to send emails.");
  }
});
