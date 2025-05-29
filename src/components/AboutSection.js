"use client"; 

import React from 'react';
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'use-intl';

const videos = [
  "https://www.youtube.com/watch?v=oR2StQvQN_I&t=20s",
  "https://www.youtube.com/watch?v=5gKxB8VQiTk"
];

function AboutSection() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };


  return (
    <section id="about"  className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/HNLXqCTHwC0?si=hC7vclfecOTaVQ1n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-4 text-yellow-800">{t("about")}</h2>
            <p className="text-gray-700 mb-4">
              {t("bioIntro")}
            </p>
            <p className="text-gray-700 mb-4">
              {t("bioPhilosophy")}
            </p>
            <p className="text-gray-700">
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;