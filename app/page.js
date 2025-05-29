import React from 'react';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      
    </div>
  );
}