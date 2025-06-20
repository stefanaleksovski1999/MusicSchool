import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const selectedDate = url.searchParams.get("selectedDate");

    if (!selectedDate) {
      return new NextResponse("Missing selectedDate", { status: 400 });
    }

    await connectDB();

    const bookings = await Booking.find({ date: selectedDate });

    const bookedTimes = bookings.map((booking) => booking.time);

    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error("❌ Error fetching booked times:", error);
    return new NextResponse("Error fetching booked times", { status: 500 });
  }
}