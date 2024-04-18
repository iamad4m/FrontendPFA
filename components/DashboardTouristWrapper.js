"use client";
import React from "react";
import SideIconsTourist from "@/components/SideIconsTourist";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const DashboardTouristWrapper = ({ children }) => {
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
  const router = useRouter();
  if (session) {
    return (
      <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <aside className="h-full w-16 flex flex-col items-center justify-between relative bg-blue-950 text-white">
          <Link href={"/"} title="Home">
            <img src="/logo.png" className="mt-2 ml-1" width={"50rem"} />
          </Link>

          <SideIconsTourist />
        </aside>

        <div className="w-full h-full flex flex-col justify-between">
          <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-blue-950">
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium ">{session.user.email}</div>
                <div className="text-sm font-regular">Dashboard</div>
              </div>
              <Link href={"/tourist"}>
                <img
                  className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-indigo-600"
                  src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${session.user.email}&radius=50&size=50&backgroundType=gradientLinear`}
                  alt="avatar"
                />
              </Link>
            </div>
          </header>
          <main className="max-w-full h-full flex relative overflow-y-scroll">
            {children}
          </main>
        </div>
      </div>
    );
  } //else {
  //   router.push("/");
  // }
};

export default DashboardTouristWrapper;
