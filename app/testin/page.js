"use client";

import ChooseCityCircuit from "@/components/ChooseCityCircuit";
import ChooseInfoCircuit from "@/components/ChooseInfoCircuit";
import ChooseMonumentsCircuit from "@/components/ChooseMonumentsCircuit";
import CircuitSummary from "@/components/CircuitSummary";
import React, { useState } from "react";
export default function page() {
  const [chosenCity, setChosenCity] = useState("");
  const [chosenMonuments, setChosenMonuments] = useState([]); // array of object
  const [step, setStep] = useState(1);
  const [myDate, setMyDate] = useState("");
  const [myMonument, setMonument] = useState("");

  return (
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
  );
}
