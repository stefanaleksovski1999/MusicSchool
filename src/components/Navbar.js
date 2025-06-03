"use client";

import React, { useEffect, useState} from 'react';
import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation';
import { useTranslations } from 'use-intl';

function Navbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isGerman = pathname.startsWith('/de');


  const [locale, setLocale] = useState("");
  useEffect(() => {

    const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("MYMUSICCALENDARAPPMKDCHASOVI_LOCALE=")) //mora da e unikatno
    ?.split("=")[1];
    if(cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      console.log(browserLocale);
      setLocale(browserLocale);
      document.cookie = `MYMUSICCALENDARAPPMKDCHASOVI_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    document.cookie = `MYMUSICCALENDARAPPMKDCHASOVI_LOCALE=${newLocale};`;
    router.refresh();
  };

  // const handleLocaleSwitch = () => {
  //   router.push(`/${newLocale}${currentPath}`);
  // };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/#home" className="flex items-center space-x-2">
          <img src="/piano-keyboard-svgrepo-com.svg" className="w-full h-auto max-w-[50px]" alt="Logo" />
          <span className="text-xl font-bold">{t("brand")}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/#home" className="hover:text-indigo-200">{t("home")}</Link>
          <Link href="/#about" className="hover:text-indigo-200">{t("about")}</Link>
          <Link href="/#services" className="hover:text-indigo-200">{t("services")}</Link>
          <Link href="/#testimonials" className="hover:text-indigo-200">{t("testimonials")}</Link>
          <Link href="/#pricing" className="hover:text-indigo-200">{t("pricing")}</Link>
          <Link href="/#contact" className="hover:text-indigo-200">{t("contact")}</Link>
          <select
            value={locale}
            onChange={(e) => changeLocale(e.target.value)}
            className="bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-600 cursor-pointer"
          >
            <option  value="en">🇬🇧 English</option>
            <option  value="de">🇩🇪 Deutsch</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 mt-2 py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Link href="/#home" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("home")}</Link>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("about")}</Link>
            <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("services")}</Link>
            <Link href="/#testimonials" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("testimonials")}</Link>
            <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("pricing")}</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-200 py-1">{t("contact")}</Link>
            {/* Mobile Language Switch */}
            <div 
              className="cursor-pointer mt-2 flex items-center space-x-2"
              onClick={handleLocaleSwitch}
            >
              <img 
                src={isGerman ? "/flags/en.svg" : "/flags/de.svg"} 
                alt="Lang" 
                className="w-6 h-4 rounded shadow"
              />
              <span>{isGerman ? 'English' : 'Deutsch'}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
