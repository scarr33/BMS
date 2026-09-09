import crypto from "crypto";
import { config } from "../../config/config";
import nodemailer from "nodemailer";
import MailGen from "mailgen";

// Generate OTP
export const generateOTP = () => {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};

//  Hash otp
export const hashOTP = (data: string) => {
  if (!config.hashingSecret) {
    throw new Error("Hashing secret is not defined");
  }
  return crypto
    .createHmac("sha256", config.hashingSecret)
    .update(data)
    .digest("hex");
};

// Verify otp
export const verifyOTP = (hashedOTP: string, data: string) => {
  const newHashedOTP = hashOTP(data);
  return newHashedOTP === hashedOTP;
};

// Send OTP to user via Email
const _config = {
  service: "gmail" as string,
  auth: {
    user: config.emailUsername,
    pass: config.emailPassword,
  },
};

const transporter = nodemailer.createTransport(_config);
const mailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "bookMyScreen",
    link: "https://suchak.vercel.app",
    logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751475322/zu4fnmh2jljzbtey77ah.png",
  },
});

export const sendOTPtoEmail = async (email: string, otp: number) => {
  const emailTemp: any = {
    body: {
      name: "Suchak",
      intro:
        "Welcome to bookMyScreen! We're very excited to have you on board.",
      action: {
        instructions: "To verify your account, please use the following OTP:",
        button: {
          color: "#323232", // Optional action button color
          text: otp,
          link: "#",
        },
      },
      outro:
        "This OTP will expire in a short time (2 mins) for security reasons. If you did not request this OTP, please ignore this email.",
    },
  };

  const mail = mailGenerator.generate(emailTemp);

  let message = {
    from: config.emailUsername,
    to: email,
    subject: "Your OTP for bookMyScreen",
    html: mail,
  };

  const info = await transporter.sendMail(message);
  return info.messageId;
};
