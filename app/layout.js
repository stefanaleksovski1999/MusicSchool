import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';


export const metadata = {
  title: 'Melody Masters - Online Piano Lessons',
  description: 'Professional piano instruction from the comfort of your home via Microsoft Teams',
}

export default async  function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} className="scroll-smooth">
      <body>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
          {children}
        <Footer />
      </NextIntlClientProvider>
      </body>
    </html>
  )
}
