"use client";
import { useState } from "react";

export default function WriteReviewPage() {
  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus("✅ Thank you for your feedback!");
      setFormData({ name: "", role: "", message: "" });
    } else {
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="w-full bg-blue-500 p-4 flex justify-center items-stretch bg-gradient-to-r from-yellow-600 to-gray-500">
      <div className="p-6 max-w-md w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-center">Write a Testimonial</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border-gray-600 rounded bg-gray-700"
            required
          />
          <input
            type="text"
            placeholder="Your Role (e.g. Adult Beginner, 3 months)"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border-gray-600 rounded bg-gray-700"
            required
          />
          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border-gray-600 rounded bg-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Submit
          </button>
          {status && <p className="text-center mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
