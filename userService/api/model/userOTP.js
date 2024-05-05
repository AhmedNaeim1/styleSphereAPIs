const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserOTPVerificationSchema = new Schema({
  userEmail: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
}, { collection: "UserOTPVerification" });
const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
module.exports = UserOTPVerification;
