import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Piano Classes</h3>
            <p className="text-indigo-200">Professional Piano Instruction via Microsoft Teams</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold mb-2">Contact</h4>
            <p className="text-indigo-200">Email: stefan.aleksovski1999@gmail.com</p>
            <p className="text-indigo-200">Phone: 015215950220</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Follow Me</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-indigo-200 hover:text-white">
                <span>Facebook</span>
              </Link>
              <Link href="#" className="text-indigo-200 hover:text-white">
                <span>Instagram</span>
              </Link>
              <Link href="#" className="text-indigo-200 hover:text-white">
                <span>YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-indigo-800 text-center text-indigo-200">
          <p>&copy; {new Date().getFullYear()} Melody Masters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;