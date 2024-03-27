"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  return (
    <div className="w-full">
      <header className="top-0 bg-white shadow p-4 h-16 flex flex-col items-start justify-center">
        <ol
          className="flex items-center whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <li className="inline-flex items-center">
            <Link
              className="flex items-center text-sm hover:text-blue-600 outline-none text-blue-600"
              href="/tourist"
            >
              Profile
            </Link>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>

          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            Settings
          </li>
        </ol>
      </header>
      <main className="flex flex-wrap -mb-4 -mx-2 p-4">
        <div className="w-full sm:w-1/4 md:w-1/4 mb-4 px-2">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto bg-gray-200 border-2 border-indigo-600"
                src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${session.user.name}&radius=50&size=50&backgroundType=gradientLinear`}
                alt="Adam Houlihal"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                Adam Houlihal
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>Tourist</p>
              </div>
              <table className="text-xs my-3 flex items-center justify-center">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{session.user.email}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">+212 642951546</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/4 md:w-3/4 mb-4 px-2">
          <div className="bg-indigo-500 h-20">
            <p>General Settings</p>
            <p>Update Password</p>
            <p>Delete Account</p>
          </div>
        </div>
      </main>
    </div>
  );
}
