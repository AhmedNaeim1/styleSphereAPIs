const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    location: { type: String, default: "Egypt" },
    profilePictureUrl: { type: String },
    registrationDate: { type: String , default: new Date().toISOString() },
    followingCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    businessID: { type: mongoose.Schema.Types.ObjectId },
    languagePreference: { type: String, default: "English" },
    currencyPreference: { type: String, default: "EGP" },
    regionPreference: { type: String, default: "Egypt" },
    preferredStyles: [{ type: String, default: [] }],
    preferredMaterials: [{ type: String, default: [] }],
    preferredOccasions: [{ type: String, default: [] }],
    preferredFits: [{ type: String, default: [] }],
    token: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { collection: "user" }
);

// Pre-save hook to set businessID to the value of _id
userSchema.pre('save', function(next) {
  if (!this.businessID) {
    this.businessID = this._id;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
