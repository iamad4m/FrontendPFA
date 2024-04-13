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
            src="https://images.unsplash.com/photo-1696952353145-e5ac4b32de9b"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 1 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1561642769-1bca263542e0"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 2 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1581175892881-b0124e689824"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 3 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1628474754745-7c89f629cba8"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 4 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1598022124758-26d09adcb7b6"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 5 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1633264542743-c1acdb5eff0e"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 6 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1517573847294-84690dbc5df8"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 7 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1568994660719-e69438848e42"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 8 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1526928878027-1cf28c1405ba"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 9 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1550824684-f2b633526a7a"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div
          className="duration-700 ease-in-out"
          data-carousel-item
          style={{ opacity: currentSlide === 10 ? 1 : 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1597081315272-a8b558ca4e86"
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
}
