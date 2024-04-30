import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CircuitSummary({
  chosenCity,
  chosenMonuments,
  myMonument,
  myDate,
  step,
  setStep,
  email,
  setIsLoading,
}) {
  const navigation = useRouter();
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`/api/saveCircuit`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: (variables) => {
      console.log("posting...");
      setIsLoading(true);
    },
    onSuccess: (data, variables, context) => {
      console.log("circuit created");
      navigation.push("/tourist/circuit");
      setIsLoading(false);
    },
    onError: (err, variables, context) => {
      console.log(err.message);
      setIsLoading(false);
    },
  });
  const mutateInfo = () => {
    const monumentsName = chosenMonuments.map((item) => item.value);
    const body = {
      cityName: chosenCity,
      monuments: monumentsName,
      depMonument: myMonument,
      depDate: myDate,
      touristEmail: email,
    };
    mutation.mutate(body);
  };
  return (
    <div className={step !== 4 ? "hidden" : ""}>
      <div
        className={"flex h-full w-full items-center justify-center mt-10 mb-8"}
      >
        <div className="w-96 rounded bg-gray-50 px-6 pt-8 shadow-lg">
          <img src="/logo.png" alt="chippz" className="mx-auto w-16 py-4" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-semibold">Travel</h4>
            <p className="text-xs">Your Circuit Setup Summary</p>
          </div>
          <div className="flex flex-col gap-3 border-b py-6 text-xs">
            <p className="flex justify-between">
              <span className="text-gray-400 me-4">City:</span>
              <span>{chosenCity.toUpperCase()}</span>
            </p>
            <br />
            <p className="flex justify-between">
              <span className="text-gray-400 me-4">Monuments:</span>
              <span>
                {chosenMonuments.map((monument) => {
                  return (
                    <>
                      {monument.value}
                      <br />
                    </>
                  );
                })}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 me-4">Departure Monument:</span>
              <span>{myMonument}</span>
            </p>
            <br />
            <p className="flex justify-between">
              <span className="text-gray-400 me-4">Departure Date:</span>
              <span>{myDate}</span>
            </p>
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
          onClick={mutateInfo}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Save Circuit
          </span>
        </button>
      </div>
    </div>
  );
}
