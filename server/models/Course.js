const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, index: true },
    courseDescription: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    whatYouWillLearn: { type: String },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        default: [],
      },
    ],
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
        default: [],
      },
    ],
    price: { type: Number, required: true },
    thumbnail: { type: String },
    tag: { type: [String], required: true, index: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        default: [],
      },
    ],
    instructions: { type: [String] },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);
