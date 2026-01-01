import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config({ path: "config/.env.local" });

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export default async function sendEmail(options: EmailOptions) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_NAME, FROM_EMAIL } = process.env;

  console.log("SMTP_USER:", process.env.SMTP_USER);

  // // ✅ Hard guard (prevents "Missing credentials for PLAIN")
  // if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !FROM_EMAIL) {
  //   throw new Error("SMTP / Mailtrap environment variables are missing");
  // }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT), // Mailtrap: 2525
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  } as SMTPTransport.Options);

  // ✅ Optional but very useful during development
  await transporter.verify();

  await transporter.sendMail({
    from: `${FROM_NAME ?? "No Reply"} <${FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });
}
