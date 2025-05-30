import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


function Hero() {
  const t = useTranslations();
  return (
    <section id="home" className="bg-gradient-to-r from-yellow-600 to-gray-500 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("heroTitle")}</h1>
        <p className="text-xl md:text-2xl mb-8">{t("heroSubtitle")}</p>
        <Link href="/BookingCalendar?bookingType=free%20trial" className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-100 transition duration-300">
          {t("bookTrial")}
        </Link>
      </div>
    </section>
  );
}

export default Hero;