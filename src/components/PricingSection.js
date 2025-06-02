"use client";
import React, { useState } from 'react';

function PricingSection() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  

  const isSelected = (id) => selectedPackage === id;

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Lesson Packages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* One Lesson */}
          <div
            onClick={() => setSelectedPackage("one")}
            className={`p-6 rounded-lg shadow-md border-t-4 border-yellow-400 cursor-pointer ${
              isSelected("one") ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
            }`}
            
          >
            <h3 className="text-xl font-bold mb-4">One Lesson</h3>
            <div className="text-3xl font-bold mb-4">30€ </div>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center">
                ✅ 45-minute lesson
              </li>
              <li className="flex items-center">
                ✅ Personalized practice plan
              </li>
              <li className="flex items-center">
                ✅ Comprehensive music theory
              </li>
              <li className="flex items-center">
                ✅ Intermediate repertoire
              </li>
              <li className="flex items-center">
                ✅ Digital lesson materials
              </li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/BookingCalendar?bookingType=one lesson`;
              }}
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-300"
            >
              Book Now
            </button>
          </div>

          {/* 4 Lessons */}
          <div
            onClick={() => setSelectedPackage("four")}
            className={`p-6 rounded-lg shadow-md border-t-4 border-yellow-400 cursor-pointer ${
              isSelected("four") ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
            }`}   
          >
            <h3 className="text-xl font-bold mb-4">4 Lessons</h3>
            <div className="text-3xl font-bold mb-4">110€</div>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center">
                ✅ 45-minute lesson
              </li>
              <li className="flex items-center">
                ✅ Personalized practice plan
              </li>
              <li className="flex items-center">
                ✅ Comprehensive music theory
              </li>
              <li className="flex items-center">
                ✅ Intermediate repertoire
              </li>
              <li className="flex items-center">
                ✅ Digital lesson materials
              </li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/BookingCalendar?bookingType=4 lessons`;
              }}
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-300"
            >
              Book Now
            </button>
          </div>

          {/* 8 Lessons */}
          <div
            onClick={() => setSelectedPackage("eight")}
            className={`p-6 rounded-lg shadow-md border-t-4 border-yellow-400 cursor-pointer ${
              isSelected("eight") ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
            }`}         
          >
            <h3 className="text-xl font-bold mb-4">8 Lessons</h3>
            <div className="text-3xl font-bold mb-4">195€</div>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center">
                ✅ 45-minute lesson
              </li>
              <li className="flex items-center">
                ✅ Personalized practice plan
              </li>
              <li className="flex items-center">
                ✅ Comprehensive music theory
              </li>
              <li className="flex items-center">
                ✅ Intermediate repertoire
              </li>
              <li className="flex items-center">
                ✅ Digital lesson materials
              </li>
              <li className="flex items-center">
                ✅ Weekly homework
              </li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/BookingCalendar?bookingType=8 lessons`;
              }}
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-300"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PricingSection;
