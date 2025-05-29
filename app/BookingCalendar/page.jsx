"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useTranslations } from "next-intl"; 

const BookingCalendar = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const bookingTypeFromURL = searchParams.get("bookingType");
  // State for the booking process
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: '',
    date: '',
    time: '',
    bookingType: bookingTypeFromURL || "free trial",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
  ];
  // useEffect(() => {
  //   if (bookingTypeFromURL) {
  //     setFormData((prev) => ({ ...prev, bookingType: bookingTypeFromURL }));
  //   }
  // }, [bookingTypeFromURL]);
  useEffect(() => {
    const bookingTypeFromUrl = searchParams.get('bookingType');
    console.log('vlaga tuka');
    setFormData((prev) => ({
      ...prev,
      bookingType: bookingTypeFromUrl || 'free trial',
    }));
  }, [searchParams]);
  
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!selectedDate) return;
  
      const isoDate = selectedDate.toLocaleDateString("sv-SE");
      console.log("📅 Fetching booked times for:", isoDate);
  
      try {
        const response = await fetch(`/api/bookings/booked-times?selectedDate=${isoDate}`);
        const data = await response.json();
        setBookedTimes(data.bookedTimes || []);
        console.log("✅ bookedTimes from API:", data.bookedTimes);
      } catch (error) {
        console.error("❌ Failed to fetch booked times", error);
      }
    };
    
    

    fetchBookedTimes();
  }, [selectedDate]);
  

  const availableTimes = timeSlots.map((time, index) => ({
    id: index,
    value: time,
    isAvailable: !bookedTimes.includes(time),
  }));

  const updatedAvailableTimes = availableTimes.map((time) => ({
    ...time,
    isAvailable: !bookedTimes.includes(time.value),
  }));
  

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Create array of day objects
    const days = [];
    
    // Add empty days for the start of the calendar
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        date: date,
        isToday: isToday(date),
        isPast: isPastDay(date)
      });
    }
    
    return days;
  };
  
  // Check if the date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if the date is in the past
  const isPastDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Handle input changes for user info form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle going to next step
  const handleNext = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError(t('PleaseEnterYourNameAndEmail'));
        return;
      }
  
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const bookingTypeFromURL = urlParams.get("bookingType");
  
        const checkRes = await fetch(`/api/bookings?email=${formData.email}`);
        const checkData = await checkRes.json();
  
        if (checkRes.ok && checkData.exists) {
          const existingBooking = checkData.booking;
  
          // If bookingType is "free trial" in URL and booking already exists with that type
          if (
            bookingTypeFromURL === "free trial" &&
            existingBooking &&
            existingBooking.bookingType === "free trial"
          ) {
            window.location.href = "/#pricing";
            return;
          }
        }
  
        // Proceed if no conflict
        setError('');
        setStep(2);
      } catch (err) {
        console.error("❌ Email check failed:", err);
        setError("Error checking email. Please try again.");
      }
  
    } else if (step === 2) {
      if (!selectedDate) {
        setError(t('Please select a date'));
        return;
      }
      setError('');
      setStep(3);
    }
  };
  
  
  // Handle going back to previous step
  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Handle date selection
  const handleDateSelect = (date) => {
    if (date && !isPastDay(date)) {
      setSelectedDate(date);
      setFormData({ ...formData, date: date });
    }
  };
  
  // Handle month navigation
  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };
  
 
  // Handle time selection
  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time: time });
  };


  const handleSubmit = async () => {
    try {
      console.log("Sending booking with type:", formData.bookingType);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("✅ Booking successful:", result);
        setStep(4);
      } else {
        console.error("❌ Booking failed:", result);
        alert("Booking failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Error sending booking:", error);
      alert("Something went wrong.");
    }
  };
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  // Render the user info form (Step 1)
  const renderUserInfoForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">{t('yourInformation')}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-300">{t('note')}</label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows="3"
        />
      </div>
    </div>
  );
  
  // Render the calendar (Step 2)
  const renderCalendar = () => {
    const days = generateCalendarDays();
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-100">{t('selectDate')}</h2>
        
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => changeMonth(-1)}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-medium text-gray-200">{monthName}</h3>
          <button 
            onClick={() => changeMonth(1)}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-sm font-medium text-gray-400 p-2">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div key={index} className="p-2">
              {day.day ? (
                <button
                  onClick={() => handleDateSelect(day.date)}
                  disabled={day.isPast}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${day.isPast ? 'text-gray-600 cursor-not-allowed' : 
                      selectedDate && day.date.getTime() === selectedDate.getTime() ? 
                      'bg-indigo-600 text-white' : 
                      day.isToday ? 'border border-indigo-500 text-indigo-500' : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {day.day}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        
        {selectedDate && (
          <div className="mt-4 text-center p-2 bg-gray-700 rounded-md">
            <p className="text-gray-200">{t('selected')}: {formatDate(selectedDate)}</p>
          </div>
        )}
      </div>
    );
  };
  
  // Render the time selection (Step 3)
  const renderTimeSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">{t('selectDate')}</h2>
      <p className="text-gray-300">{formatDate(selectedDate)}</p>
      
      {isLoading ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {updatedAvailableTimes.map((time) => (
            <button
              key={time.id}
              onClick={() => handleTimeSelect(time.value)}
              disabled={!time.isAvailable}
              className={`p-3 rounded-md text-center ${
                !time.isAvailable
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : formData.time === time.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {time.value}
              {!time.isAvailable && <span className="block text-xs mt-1">(Booked)</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
  // Render the confirmation (Step 4)
  const renderConfirmation = () => (
    <div className="text-center space-y-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-100">Booking Confirmed! 
      Check your email for further steps.</h2>
      <div className="bg-gray-700 rounded-md p-4 max-w-md mx-auto text-left">
        <p className="text-gray-300"><span className="font-medium text-gray-200">Name:</span> {formData.name}</p>
        <p className="text-gray-300"><span className="font-medium text-gray-200">Email:</span> {formData.email}</p>
        <p className="text-gray-300"><span className="font-medium text-gray-200">Date:</span> {formatDate(formData.date)}</p>
        <p className="text-gray-300"><span className="font-medium text-gray-200">Time:</span> {formData.time}</p>
        {formData.note && (
          <p className="text-gray-300"><span className="font-medium text-gray-200">Note:</span> {formData.note}</p>
        )}
      </div>
    </div>
  );
  
  // Main render function
  return (
    <div className="w-full bg-blue-500 p-4 flex justify-center items-stretch bg-gradient-to-r from-yellow-600 to-gray-500">
      {/* Main calendar content */}
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Progress indicator */}
          <div className="flex items-center mb-6">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                  ${step >= stepNumber ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-gray-600 text-gray-500'}`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-indigo-500' : 'bg-gray-600'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Form steps */}
          {step === 1 && renderUserInfoForm()}
          {step === 2 && renderCalendar()}
          {step === 3 && renderTimeSelection()}
          {step === 4 && renderConfirmation()}
          
          {/* Error message */}
          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {/* Success message */}
          {success && step !== 4 && (
            <div className="mt-4 text-green-500 text-sm">
              {success}
            </div>
          )}
          
          {/* Navigation buttons */}
          {step < 4 && (
            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  {t('back')}
                </button>
              ) : (
                <div></div> // Empty div to maintain spacing
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  {t('next')}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.time}
                  className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
                    ${isLoading ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 
                    !formData.time ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 
                    'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {isLoading ? 'Booking...' : t('confirmBooking')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;