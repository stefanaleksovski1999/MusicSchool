import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g. "Adult Beginner, 8 months"
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
