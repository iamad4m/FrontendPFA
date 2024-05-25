"use client";

import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";

export default function page() {
  const { data: session, status } = useSession();
  if (status == "loading") {
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
  } else if (session) {
    return (
      <>
        <section className="relative bg-[url(https://images.unsplash.com/photo-1699424495131-ab928183d4f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
          <div className="absolute bg-gradient-to-r from-white/100 to-white/0 z-5 h-full w-full flex items-center justify-center"></div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 z-10">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Find Your Home Away
                <strong className="block font-extrabold text-indigo-700">
                  From Home!
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Whether you're traveling for business or pleasure, we're here to
                make your stay unforgettable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Link
                  href={
                    session.roles?.includes("tourist") ? "/tourist" : "/admin"
                  }
                  className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                >
                  Proceed to profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="relative bg-[url(https://images.unsplash.com/photo-1699424495131-ab928183d4f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
          <div className="absolute bg-gradient-to-r from-white/100 to-white/0 z-5 h-full w-full flex items-center justify-center"></div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 z-10">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Find Your Home Away
                <strong className="block font-extrabold text-indigo-700">
                  From Home!
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Whether you're traveling for business or pleasure, we're here to
                make your stay unforgettable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Link
                  href="/register"
                  className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                >
                  Sign Up
                </Link>

                <button
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
                  onClick={() => signIn("keycloak")}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
