"use client";
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 11;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
      id="default-carousel"
      className="relative w-full bg-black h-56 rounded-t-lg"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden">
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 0 ? 1 : 0 }}
        >
          <img
            src="/fes1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 1 ? 1 : 0 }}
        >
          <img
            src="/marrakech1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 2 ? 1 : 0 }}
        >
          <img
            src="/casablanca1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 3 ? 1 : 0 }}
        >
          <img
            src="/meknes1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 4 ? 1 : 0 }}
        >
          <img
            src="/rabat1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 5 ? 1 : 0 }}
        >
          <img
            src="/tangier1.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 6 ? 1 : 0 }}
        >
          <img
            src="/marrakech2.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 7 ? 1 : 0 }}
        >
          <img
            src="/casablanca2.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 8 ? 1 : 0 }}
        >
          <img
            src="/tangier2.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 9 ? 1 : 0 }}
        >
          <img
            src="/fes2.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 10 ? 1 : 0 }}
        >
          <img
            src="/rabat2.jpg"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
}
