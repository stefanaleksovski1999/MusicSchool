'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('en');

  





  useEffect(() => {
    if (pathname.startsWith('/de')) {
      setCurrentLocale('de');
    } else {
      setCurrentLocale('en');
    }
  }, [pathname]);

  const handleChange = (e) => {
    const selectedLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(/^\/(en|de)/, '');
    router.push(`/${selectedLocale}${pathWithoutLocale}`);
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-600 cursor-pointer"
    >
      <option value="en">🇬🇧 English</option>
      <option value="de">🇩🇪 Deutsch</option>
    </select>
  );
}
