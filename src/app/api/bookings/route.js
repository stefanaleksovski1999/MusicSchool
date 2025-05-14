import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";  
import Booking from "../../../models/Booking";  
import { sendConfirmationEmail } from "@/lib/sendEmail";



export async function POST(req) {
  try {
    console.log("✅ Received a request to /api/bookings");

    // Connect to MongoDB
    await connectDB();

    const data = await req.json();
    console.log("📨 Request body:", data);
    const { name, time, date, email, bookingType } = data;


    // ✅ Convert bookingDate to ISO format (YYYY-MM-DD)
    const isoDate = new Date(date).toLocaleDateString("sv-SE");  

    // ✅ Save booking with ISO date
    const newBooking = new Booking({
        name,
        email,
        time,
        date: isoDate,
        bookingType: bookingType || "free trial"
    });
    await newBooking.save();
    

    console.log("✅ Booking saved:", newBooking);

    await sendConfirmationEmail({
      to: email,
      name,
      date: isoDate,
      time,
      bookingType,
    });

    return NextResponse.json({ message: "Booking saved!", newBooking });
    
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  await connectDB();
  const existing = await Booking.findOne({ email });

  if (existing) {
    return NextResponse.json({
      exists: true,
      booking: {
        email: existing.email,
        bookingType: existing.bookingType,
        date: existing.date,
        time: existing.time,
        name: existing.name,
      }
    });
  }

  return NextResponse.json({ exists: false });
};

