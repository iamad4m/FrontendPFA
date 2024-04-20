"use client";

import ChooseCityCircuit from "@/components/ChooseCityCircuit";
import ChooseInfoCircuit from "@/components/ChooseInfoCircuit";
import ChooseMonumentsCircuit from "@/components/ChooseMonumentsCircuit";
import CircuitSummary from "@/components/CircuitSummary";
import Link from "next/link";
import React, { useState } from "react";
export default function page() {
  const [chosenCity, setChosenCity] = useState("");
  const [chosenMonuments, setChosenMonuments] = useState([]); // array of object
  const [step, setStep] = useState(1);
  const [myDate, setMyDate] = useState("");
  const [myMonument, setMonument] = useState("");

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
            Create
          </li>
        </ol>
      </header>
      <section className="container p-6 mx-auto space-y-3">
        <h4 className="text-xl font-bold text-gray-700 capitalize dark:text-gray-300 md:text-3xl text-center">
          Set Up Your Next Adventure 🌍🧭​​
        </h4>
        {/* I included the btns in the other components, because each next button handle something different */}
        <ChooseCityCircuit
          focused={chosenCity}
          setFocused={setChosenCity}
          step={step}
          setStep={setStep}
        />
        <ChooseMonumentsCircuit
          chosenMonuments={chosenMonuments}
          setChosenMonuments={setChosenMonuments}
          step={step}
          setStep={setStep}
        />
        <ChooseInfoCircuit
          setMyDate={setMyDate}
          setMonument={setMonument}
          step={step}
          setStep={setStep}
          chosenMonuments={chosenMonuments}
        />
        <CircuitSummary
          chosenCity={chosenCity}
          chosenMonuments={chosenMonuments}
          myMonument={myMonument}
          myDate={myDate}
          step={step}
          setStep={setStep}
        />
      </section>
    </div>
  );
}
