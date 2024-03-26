"use client";
import { signOut } from "next-auth/react";

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

export default function SideIconsTourist() {
  return (
    <>
      <section className="flex flex-col space-y-10 items-center justify-center">
        <button title="Profile">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600  hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/profile.svg" />
          </div>
        </button>
        <button title="Circuit">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600  hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/destination.svg" />
          </div>
        </button>
        <button title="Social Network">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600  hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/socialnetwork.svg" />
          </div>
        </button>
        <button
          title="Logout"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut());
          }}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600  hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/logout.svg" />
          </div>
        </button>
      </section>
      <div className=""></div>
    </>
  );
}
