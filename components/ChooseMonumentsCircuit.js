"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ChooseMonumentsCircuit({
  chosenMonuments,
  setChosenMonuments,
  step,
  setStep,
  allMonuments,
  chosenCity,
}) {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    // event.target.checked = false;
    const key = event.target.dataset.key;
    setChosenMonuments((prevSelectedValues) => {
      if (checked) {
        return [...prevSelectedValues, { key, value }];
      } else {
        return prevSelectedValues.filter((item) => item.value !== value);
      }
    });
  };
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const bodyStyle = {
    height: "9rem", // Adjust this value as needed
    overflow: "scroll",
  };

  return (
    <div className={step !== 2 ? "hidden" : ""}>
      <div>
        <p className="text-center">
          <span className="font-bold underline decoration-indigo-500 me-3">
            Step 2:
          </span>
          Choose The Monuments.
        </p>
        <div className="flex items-center justify-center">
          <div className="grid gap-8 my-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {allMonuments.map((item, index) => {
              if (item.city.name === chosenCity) {
                return (
                  <div style={cardStyle} key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      value={item.name}
                      className="hidden peer"
                      required=""
                      data-key={index}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={index}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-indigo-600 hover:text-gray-900 peer-checked:text-gray-600 hover:bg-purple-50 peer-checked:bg-purple-50"
                      style={labelStyle}
                    >
                      <div className="w-full text-lg font-semibold text-indigo-800">
                        {item.name}
                      </div>
                      <div className="block" style={bodyStyle}>
                        <div className="w-full text-sm text-gray-900">
                          {item.description}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={() => {
            setChosenMonuments([]);
            setStep(step - 1);
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Previous Step
          </span>
        </button>
        <button
          disabled={chosenMonuments.length === 0}
          className={
            chosenMonuments.length === 0
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
