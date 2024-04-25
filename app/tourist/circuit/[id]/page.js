"use client";

import MyMap from "@/components/Map";
import { DateTime } from "luxon";
import Link from "next/link";

export default function Page({ params }) {
  console.log(params.id);
  const monuments = ["monument 1", "monuments 2", "monument 3", "monument 4"];
  return (
    <div className="w-full overflow-x-hidden">
      <header className="top-0 bg-white shadow p-4 h-16 flex flex-col items-start justify-center">
        <ol
          className="flex items-center whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <li className="inline-flex items-center">
            <Link
              className="flex items-center text-sm hover:text-blue-600 outline-none text-blue-600"
              href="/tourist/circuit"
            >
              Circuit
            </Link>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>

          <li
            className="inline-flex items-center text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            Settings
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            View
          </li>
        </ol>
      </header>
      <section className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Your Optimized Route For This Adventure
            </h2>
          </div>
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden text-center">
                <MyMap />
              </div>
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">City</h3>
                    <p className="mt-1 text-gray-600">Fez</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Monuments
                    </h3>
                    {monuments.map((item, index) => {
                      return (
                        <p className="mt-1 text-gray-600" key={index}>
                          {String.fromCharCode(65 + index)}. {item}
                        </p>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Departure
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Monument: {monuments[0]}
                    </p>
                    <p className="mt-1 text-gray-600">
                      Date :{" "}
                      {DateTime.fromISO(
                        new Date().toISOString()
                      ).toLocaleString(DateTime.DATE_MED)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
