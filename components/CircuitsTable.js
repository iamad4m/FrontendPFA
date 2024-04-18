"use client";

import React, { useState } from "react";

const CircuitsTable = () => {
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg ml-5">
        <div class="pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mx-3 mt-2">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for city"
            />
          </div>
        </div>

        <table className="w-full text-lg text-left rtl:text-right text-gray-900 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-6">
                City
              </th>
              <th scope="col" class="p-6">
                Departure Monument
              </th>
              <th scope="col" class="p-6">
                Departure Date
              </th>
              <th scope="col" class="p-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Replace the sample data with your actual data --> */}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">Fes</td>
              <td class="px-6 py-4">XYZ</td>
              <td class="px-6 py-4">X/Y/Z date</td>

              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-green-600 dark:text-green-500 hover:underline mr-3"
                >
                  View
                </a>
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">Meknes</td>
              <td class="px-6 py-4">XYZ</td>
              <td class="px-6 py-4">X/Y/Z</td>

              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-green-600 dark:text-green-500 hover:underline mr-3"
                >
                  View
                </a>
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"
                >
                  Delete
                </a>
              </td>
            </tr>
            {/* <!-- Add more rows as needed --> */}
          </tbody>
        </table>
        {/* <!-- Pagination or any other content can be added here --> */}

        <nav
          class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div class="hidden sm:block"></div>
          <div class="flex justify-between sm:justify-end space-x-2">
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              First
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Previous
            </a>

            {/* <a
              href="#"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-600 dark:text-white border border-blue-300 dark:border-blue-600 rounded-md"
            >
              3
            </a> */}

            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Next
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Last
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default CircuitsTable;
