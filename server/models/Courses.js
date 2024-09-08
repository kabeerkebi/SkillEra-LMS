// models/Courses.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const LessonSchema = new mongoose.Schema({
  description: { type: String, required: true },
  videos: { type: String, required: true }, // URL to the video
});

const RatingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});
const CourseSchema = new mongoose.Schema({
  profilePicture: { type: String, required: false },
  thumbnail: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false },
  level: { type: String, required: false },
  language: { type: String, required: false },
  duration: { type: String, required: false },
  instructorName: { type: String, required: false },
  bio: { type: String, required: false },
  price: { type: String, required: false },
  publishDate: { type: String, required: false },
  lessons: [LessonSchema], // Updated to store an array of lessons
  averageRating: { type: Number, default: 0 }, // Store the average rating
  ratings: [RatingSchema], // Array of individual ratings
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);
