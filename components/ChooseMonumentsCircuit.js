"use client";

import React, { useState } from "react";

export default function ChooseMonumentsCircuit({
  chosenMonuments,
  setChosenMonuments,
  step,
  setStep,
}) {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
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
            <div style={cardStyle}>
              <input
                type="checkbox"
                id="option1"
                value="Option 1"
                className="hidden peer"
                required=""
                data-key="1"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="option1"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-indigo-600 hover:text-gray-900 peer-checked:text-gray-600 hover:bg-purple-50 peer-checked:bg-purple-50"
                style={labelStyle}
              >
                <div className="w-full text-lg font-semibold text-indigo-800">
                  Option 1
                </div>
                <div className="block" style={bodyStyle}>
                  <div className="w-full text-sm text-gray-900">
                    Velit nisi veniam dolore ex excepteur officia fugiat minim.
                    Laborum culpa ex reprehenderit aliqua. Pariatur esse
                    consectetur duis ullamco. Sunt adipisicing sit consectetur
                    nulla nostrud eiusmod velit do do sint voluptate. Voluptate
                    nostrud sint voluptate non cupidatat officia amet labore
                    duis sunt esse occaecat incididunt id. In dolore adipisicing
                    aliquip reprehenderit. Velit nisi veniam dolore ex excepteur
                    officia fugiat minim. Laborum culpa ex reprehenderit aliqua.
                    Pariatur esse consectetur duis ullamco. Sunt adipisicing sit
                    consectetur nulla nostrud eiusmod velit do do sint
                    voluptate. Voluptate nostrud sint voluptate non cupidatat
                    officia amet labore duis sunt esse occaecat incididunt id.
                    In dolore adipisicing aliquip reprehenderit.
                  </div>
                </div>
              </label>
            </div>
            <div style={cardStyle}>
              <input
                type="checkbox"
                id="option2"
                value="Option 2"
                className="hidden peer"
                required=""
                data-key="2"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="option2"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-indigo-600 hover:text-gray-900 peer-checked:text-gray-600 hover:bg-purple-50 peer-checked:bg-purple-50"
                style={labelStyle}
              >
                <div className="w-full text-lg font-semibold text-indigo-800">
                  Option 2
                </div>
                <div className="block" style={bodyStyle}>
                  <div className="w-full text-sm text-gray-900">
                    Velit nisi veniam dolore ex excepteur officia fugiat minim.
                    Laborum culpa ex reprehenderit aliqua. Pariatur esse
                    consectetur duis ullamco. Sunt adipisicing sit consectetur
                    nulla nostrud eiusmod velit do do sint voluptate. Voluptate
                    nostrud sint voluptate non cupidatat officia amet labore
                    duis sunt esse occaecat incididunt id.
                  </div>
                </div>
              </label>
            </div>
            <div style={cardStyle}>
              <input
                type="checkbox"
                id="option3"
                value="Option 3"
                className="hidden peer"
                required=""
                data-key="3"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="option3"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-indigo-600 hover:text-gray-900 peer-checked:text-gray-600 hover:bg-purple-50 peer-checked:bg-purple-50"
                style={labelStyle}
              >
                <div className="w-full text-lg font-semibold text-indigo-800">
                  Option 3
                </div>
                <div className="block" style={bodyStyle}>
                  <div className="w-full text-sm text-gray-900">
                    Velit nisi veniam dolore ex excepteur officia fugiat minim.
                    Laborum culpa ex reprehenderit aliqua. Pariatur esse
                    consectetur duis ullamco. Sunt adipisicing sit consectetur
                    nulla nostrud eiusmod velit do do sint voluptate. Voluptate
                    nostrud sint voluptate non cupidatat officia amet labore
                    duis sunt esse occaecat incididunt id.
                  </div>
                </div>
              </label>
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
