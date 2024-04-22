"use client";

import CircuitCarouselCard from "@/components/CircuitCarouselCard";
import CircuitsTable from "@/components/CircuitsTable";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function page() {
  const { data: session } = useSession();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getCircuits", session.user.email],
    queryFn: () =>
      axios.get(`/api/getcircuits?email=${session.user.email}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="w-full overflow-x-hidden">
      {isLoading ? (
        <div
          className="absolute bg-white bg-opacity-100 z-10 h-full w-full flex items-center justify-center"
          id="loader"
        >
          <div className="flex items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        </div>
      ) : null}
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
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            Settings
          </li>
        </ol>
      </header>
      <main className="flex flex-wrap -mb-4 mt-5 -mx-9 p-4">
        <div className="w-full sm:w-2/3 md:w-2/3 mb-4 px-2">
          <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-indigo-600  dark:text-gray-200 mx-5 mb-3">
            Your Circuits
          </h1>
          <CircuitsTable data={data} />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/3 mb-4 px-2">
          <CircuitCarouselCard />
        </div>
      </main>
    </div>
  );
}
