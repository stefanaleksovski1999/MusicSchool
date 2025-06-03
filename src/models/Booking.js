import mongoose from 'mongoose';

const BookingSchema = new  mongoose.Schema({
    time: { type: String, required: true },
    date: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false},
    bookingType: {
        type: String,
        enum: ["free trial", "4 lessons", "8 lessons"],
        default: "free trial",
      },
}, { timestamps: true });


export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

