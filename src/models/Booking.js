import mongoose, {Schema} from 'mongoose';

const BookingSchema = new  mongoose.Schema({
    time: { type: String, required: true },
    date: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false},
    bookingType: {
        type: String,
        enum: ["free trial", "beginner package", "standard package", "advanced package"],
        default: "free trial",
      },
}, { timestamps: true });


export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

