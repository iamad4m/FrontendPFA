"use client";

import React, { useState } from "react";

export default function ChooseCityCircuit({
  focused,
  setFocused,
  step,
  setStep,
}) {
  return (
    <div className={step !== 1 ? "hidden" : ""}>
      <div>
        <p className="text-center">
          <span className="font-bold underline decoration-indigo-500 me-3">
            Step 1:
          </span>
          Choose A City.
        </p>
        <div className="flex items-center justify-center">
          <div className="grid gap-8 my-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "fes"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("fes")}
              >
                <img
                  src="/fes1.jpg"
                  alt="Fez"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">Fez</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  Athens of Africa
                </div>
              </article>
            </div>

            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "casablanca"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("casablanca")}
              >
                <img
                  src="/casablanca1.jpg"
                  alt="Casablanca"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  Casablanca
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  The White City
                </div>
              </article>
            </div>

            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "rabat"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("rabat")}
              >
                <img
                  src="/rabat1.jpg"
                  alt="Rabat"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  Rabat
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  The Royal City
                </div>
              </article>
            </div>

            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "meknes"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("meknes")}
              >
                <img
                  src="/meknes1.jpg"
                  alt="Meknes"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  Meknes
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  Versailles of Morocco
                </div>
              </article>
            </div>

            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "marrakech"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("marrakech")}
              >
                <img
                  src="/marrakech2.jpg"
                  alt="Marrakech"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  Marrakech
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  The Red City
                </div>
              </article>
            </div>
            <div className="w-full max-w-xs text-center">
              <article
                className={
                  focused === "tangier"
                    ? "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-indigo-600"
                    : "cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto border-4 border-gray-300 hover:border-indigo-600 transition duration-300 ease-in-out"
                }
                onClick={() => setFocused("tangier")}
              >
                <img
                  src="/tangier1.jpg"
                  alt="Tangier"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  Tangier
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  The Bride of the North
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        {/* this button is hidden using the opacity for layout puposes
            if I remove it the next btn will be centred, and i don't want this
            behavior
        */}
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 opacity-0">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Previous Step
          </span>
        </button>
        <button
          disabled={focused === ""}
          className={
            focused === ""
              ? "cursor-not-allowed relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
              : "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
          }
          onClick={() => setStep(step + 1)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Next Step
          </span>
        </button>
      </div>
    </div>
  );
}
