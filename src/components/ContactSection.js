"use client";

import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

function ContactSection() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    experience: 'beginner'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      experience: 'beginner'
    });
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-yellow-600 to-gray-500 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-white-800">{t("getInTouch")}</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-yellow-800"></h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">{t("yourName")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">{t("emailAddress")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">{t("phoneNumber")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-700 mb-2">{t("experienceLevel")}</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">{t("yourMessage")}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-300">
                {t("sendMessage")}
              </button>
            </form>
          </div>
          
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-yellow-800">{t("howItWorks")}</h3>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold mr-3">1</div>
                <h4 className="text-gray-700 font-bold text-lg">{t("step1Title")}</h4>
              </div>
              <p className="text-gray-700 pl-11">{t("step1Desc")}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold mr-3">2</div>
                <h4 className="text-gray-700 font-bold text-lg">{t("step2Title")}</h4>
              </div>
              <p className="text-gray-700 pl-11">{t("step2Desc")}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold mr-3">3</div>
                <h4 className="text-gray-700 font-bold text-lg">{t("step3Title")}</h4>
              </div>
              <p className="text-gray-700 pl-11">{t("step3Desc")}</p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold mr-3">4</div>
                <h4 className="text-gray-700 font-bold text-lg">{t("step4Title")}</h4>
              </div>
              <p className="text-gray-700 pl-11">{t("step4Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;