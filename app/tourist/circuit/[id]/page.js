"use client";

import MyMap from "@/components/Map";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["getCircuitByID", session.user.email],
    queryFn: () =>
      axios
        .get(`/api/getCircuitById?id=${params.id}&email=${session.user.email}`)
        .then((res) => {
          setInfo(res.data);
          return res.data;
        }),
  });
  if (isError) {
    router.push("/tourist/circuit");
  }
  return (
    <>
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
      ) : (
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
                    {info ? <MyMap info={info} /> : null}
                  </div>
                  <div>
                    <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                      <div className="px-6">
                        <p className="text-xl font-extrabold text-indigo-700">
                          {data?.circuit.city.toUpperCase() + ":"}
                          <span className="font-semibold text-black">
                            {" "}
                            {DateTime.fromISO(
                              data?.circuit.departureDate
                            ).toLocaleString(DateTime.DATE_MED)}
                          </span>
                        </p>
                      </div>
                      <div className="border-gray-200 px-6 py-4">
                        <ol className="relative border-s border-gray-200">
                          <li className="mb-10 ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              Monument A
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {data?.circuit.departureMonument.name}
                            </h3>
                          </li>
                        </ol>
                        {data
                          ? data.route.map((item, index) => {
                              return (
                                <ol
                                  className="relative border-s border-gray-200"
                                  key={index}
                                >
                                  <li className="mb-10 ms-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                      Monument{" "}
                                      {String.fromCharCode(65 + index + 1)}
                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {data.circuit.monuments[item].name}
                                    </h3>
                                  </li>
                                </ol>
                              );
                            })
                          : null}
                      </div>
                      {/* <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Departure
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Monument: {monuments[0]}
                    </p>
                    <p className="mt-1 text-gray-600">
                      Date :{" "}
                      {DateTime.fromISO(
                        data?.circuit.departureDate
                      ).toLocaleString(DateTime.DATE_MED)}
                    </p>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
