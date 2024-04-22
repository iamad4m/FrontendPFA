"use client";

import React, { useEffect, useState } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function ChooseInfoCircuit({
  setMyDate,
  setMonument,
  step,
  setStep,
  chosenMonuments,
}) {
  useEffect(() => {
    const datepickerEl = document?.getElementById("datepickerId");
    // console.log(datepickerEl);
    new Datepicker(datepickerEl, {});
  }, []);

  const setInfos = () => {
    const date = document?.getElementById("datepickerId").value;
    const monuments = document?.getElementById("monuments").value;
    if (
      date.length !== 0 &&
      monuments.length !== 0 &&
      new Date().getTime() < new Date(date).getTime()
    ) {
      const parts = date.split("/");
      const yyyyMMdd = `${parts[2]}-${parts[0].padStart(
        2,
        "0"
      )}-${parts[1].padStart(2, "0")}`;
      setMyDate(yyyyMMdd);
      setMonument(monuments);
      setStep(step + 1);
    }
  };
  return (
    <div className={step !== 3 ? "hidden" : ""}>
      <p className="text-center">
        <span className="font-bold underline decoration-indigo-500 me-3">
          Step 3:
        </span>
        Almost Finished, Choose Your Departure Date And Monument.
      </p>
      <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-indigo-600 rounded-lg p-6 mt-5 mb-7 lg:mx-64 sm:mx-auto md:mx-auto">
        <div className="mb-5">
          <h1 className="heading text-indigo-800">Departure Monument</h1>
          <div className="relative">
            <select
              id="monuments"
              size="3"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {chosenMonuments.map((monument) => {
                return <option key={monument.key}>{monument.value}</option>;
              })}
            </select>
          </div>
        </div>
        <div>
          <h1 className="heading text-center text-indigo-800">
            Departure Date
          </h1>
          <div className="relative">
            <input
              datepicker="true"
              datepicker-autohide="true"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select date"
              id="datepickerId"
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={() => setStep(step - 1)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Previous Step
          </span>
        </button>
        <button
          className={
            "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
          }
          onClick={setInfos}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Check My Circuit
          </span>
        </button>
      </div>
    </div>
  );
}
