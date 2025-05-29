"use client";
import React from 'react';
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';


function TestimonialsSection() {
  const tr = useTranslations();
  
  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error("❌ Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  return (
    <section id="testimonials"  className="py-16 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">{tr("testimonialsTitle")}</h2>
        <div className="text-center mb-8">
          <button
            onClick={() => window.location.href = "/write-review"}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          > 
          {tr("writeReview")}
          </button>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white p-4 rounded-lg shadow-md text-left">
              <div className="flex items-center mb-2">
                {/* Optional initials badge */}
                {/* <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-indigo-600 font-bold text-sm">
                  {t.name.slice(0, 2).toUpperCase()}
                </div> */}
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-700 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">"{t.message}"</p>
            </div>
          ))}
        </div>

          
      </div>
    </section>
  );
}

export default TestimonialsSection;