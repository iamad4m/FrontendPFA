"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(true);

  const handleDismiss = () => {
    setDismissed(true);
  };
  const schema = yup.object().shape({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    phoneNumber: yup
      .string()
      .matches(/^\+\d{1,3} \d{9}$$/)
      .required(),
    password: yup.string().required().min(8),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:8081/register", data);
    },
    onMutate: (variables) => {
      console.log("posting...");
      const loader = document.getElementById("loader");
      loader.classList.remove("hidden");
    },
    onSuccess: (data, variables, context) => {
      console.log("tourist added");
      const loader = document.getElementById("loader");
      router.push("/");
      loader.classList.add("hidden");
    },
    onError: (err, variables, context) => {
      const loader = document.getElementById("loader");
      setDismissed(false);
      console.log(err.message);
      loader.classList.add("hidden");
    },
  });
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/tourist");
    } else if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (loading) {
    return (
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
    );
  }
  const mySubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <section className="bg-white relative">
      <div
        className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center hidden"
        id="loader"
      >
        <div className="flex items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/signup.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-blue-600" href="/">
              <img
                className="h-12 sm:h-14"
                src="/logo.png"
                alt="Description of the image"
              />
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Travel 🌎
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Whether you're traveling for business or pleasure, we're here to
              make your stay unforgettable.
            </p>

            <div>
              {!dismissed && (
                <div
                  id="dismiss-alert"
                  className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 mt-5 transition-opacity"
                  role="alert"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="flex-shrink-0 size-4 mt-0.5"
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </div>
                    <div className="ms-2">
                      <div className="text-sm font-medium">
                        An Error Occurred, Please Try Again.
                      </div>
                    </div>
                    <div className="ps-3 ms-auto">
                      <div className="-mx-1.5 -my-1.5">
                        <button
                          type="button"
                          className="inline-flex bg-red-50 rounded-lg p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 dark:bg-transparent dark:hover:bg-red-500/50 dark:text-red-600"
                          data-hs-remove-element="#dismiss-alert"
                          onClick={handleDismiss}
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg
                            className="flex-shrink-0 size-4"
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit(mySubmit)}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  placeholder="Enter your first name"
                  className={
                    errors.firstName
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("firstName")}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  placeholder="Enter your last name"
                  className={
                    errors.lastName
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("lastName")}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={
                    errors.email
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("email")}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="+CountryCode PhoneNumber"
                  className={
                    errors.phoneNumber
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("phoneNumber")}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  placeholder="Enter your password"
                  className={
                    errors.password
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("password")}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  placeholder="Confirm your password"
                  name="password_confirmation"
                  className={
                    errors.passwordConfirmation
                      ? "mt-1 w-full rounded-md border border-pink-500 bg-white text-sm text-pink-500 shadow-sm p-2 focus:outline-none"
                      : "mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                  }
                  {...register("passwordConfirmation")}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?<span> </span>
                  <Link
                    href="#"
                    className="text-blue-700 underline"
                    onClick={() => signIn("keycloak")}
                  >
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
