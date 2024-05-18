"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

async function keycloakSessionLogOut() {
  try {
    const timestamp = new Date().getTime();
    await fetch(`/api/auth/logout?timestamp=${timestamp}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (err) {
    console.error(err);
  }
}

const AdminNavbar = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut();
    }
  }, [session, status]);
  if (session) {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={"/"} title="Home" className="mr-3">
              <img src="/logo.png" width={"50rem"} />
            </Link>
            <span className="text-white text-xl font-semibold mr-4">
              Admin Dashboard
            </span>
          </div>

          {/* Logout Button */}
          <div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                keycloakSessionLogOut().then(() => signOut());
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  } else {
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
};

export default AdminNavbar;
