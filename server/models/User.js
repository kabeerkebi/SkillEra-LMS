const mongoose = require("mongoose");

const RatingPreferenceSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  preference: {
    type: String,
    enum: ["dontAskAgain", "remindLater", ""],
    default: "",
  },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  isAdmin: { type: Boolean, default: false },
  ratingPreferences: [RatingPreferenceSchema],
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  resetPasswordOtp: {
    type: String,
  },
  resetPasswordOtpExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
