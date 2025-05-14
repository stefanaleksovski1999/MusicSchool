import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Melody Masters - Online Piano Lessons',
  description: 'Professional piano instruction from the comfort of your home via Microsoft Teams',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
      <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  )
}