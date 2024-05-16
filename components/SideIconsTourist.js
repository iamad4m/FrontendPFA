"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  return (
    <>
      <section className="flex flex-col space-y-10 items-center justify-center">
        <Link title="Profile" href={"/tourist"}>
          <div
            className={
              pathname === "/tourist"
                ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer bg-indigo-600"
                : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600 hover:duration-300 hover:ease-linear focus:bg-white"
            }
          >
            <img className="h-6 w-6" src="/profile.svg" />
          </div>
        </Link>
        <Link title="Circuit" href={"/tourist/circuit"}>
          <div
            className={
              pathname.startsWith("/tourist/circuit")
                ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer bg-indigo-600"
                : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600 hover:duration-300 hover:ease-linear focus:bg-white"
            }
          >
            <img className="h-6 w-6" src="/destination.svg" />
          </div>
        </Link>
        <Link title="Social Network" href={"/tourist/socialmedia"}>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600 hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/socialnetwork.svg" />
          </div>
        </Link>
        <button
          title="Logout"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut());
          }}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-indigo-600 hover:duration-300 hover:ease-linear focus:bg-white">
            <img className="h-6 w-6" src="/logout.svg" />
          </div>
        </button>
      </section>
      <div className=""></div>
    </>
  );
}
