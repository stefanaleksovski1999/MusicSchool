import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

// GET: Fetch all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST: Create a new testimonial
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, role, message } = body;

    if (!name || !role || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const newTestimonial = new Testimonial({ name, role, message });
    await newTestimonial.save();

    return NextResponse.json({ message: "Testimonial saved!", newTestimonial });
  } catch (error) {
    console.error("❌ Error saving testimonial:", error);
    return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 });
  }
}
