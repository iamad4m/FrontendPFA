import React from "react";
import Carousel from "./CircuitCarousel";
import Link from "next/link";

export default function CircuitCarouselCard() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Carousel />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Explore Most Visited Moroccan Cities!
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Looking for your next adventure? Check out these historical cities on
          our list! Click "Start Exploring" to choose a circuit and set your
          trip.
        </p>
        <Link
          href="/tourist/circuit/create"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Start Exploring
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
