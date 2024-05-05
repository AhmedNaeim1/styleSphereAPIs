const User = require("../model/User");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const UserOTPVerification = require("../model/userOTP");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  
  
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "365 days",
    }
  );
}

async function signupUser(userData, password) {
  userData.password = password;
  userData._id = new mongoose.Types.ObjectId();
  const user = new User(userData);
  const token = generateToken(user);
  user.token = token;
  await user.save();
  return user;
}

async function loginUser(email, password) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return "Invalid email";
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return "Invalid password";
  } else {
    const token = generateToken(user);
    user.token = token;
    await user.save();
    return user;
  }
}

async function logoutUser(userID) {
  const user = await userRepository.getUser(userID);
  user.token = null;
  await user.save();
  return "User logged out successfully";
}

async function sendOTPVerificationEmail(email) {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete p><p>This code <b>expires in 1 hour</b>.</p>`,
  };

  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otp, saltRounds);
  const newOTPVerification = await new UserOTPVerification({
    userEmail: email,
    otp: hashedOTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
  });
  await newOTPVerification.save();
  await transporter.sendMail(mailOptions);
  return "Success";
}

async function getUserByEmailOTP(email) {
  try {
    const user = await UserOTPVerification.findOne({ userEmail: email });
    return user;
  } catch (error) {
    throw error;
  }
}
async function verifyOTPVerificationEmail(email,otp) {
  const user = await getUserByEmailOTP(email);
  if (!user) {
    return "Invalid email";
  }
  const isOTPValid = await bcrypt.compare(otp, user.otp);
  if (!isOTPValid) {
    return "Invalid OTP";
  } else {
    const user = await userRepository.getUserByEmail(email);
    user.isVerified=true;
    await user.save();
    await UserOTPVerification.findOneAndDelete({ email: email });
   
    return "OTP Verified Successfully";
  }
}
module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  sendOTPVerificationEmail,
  verifyOTPVerificationEmail,
};
