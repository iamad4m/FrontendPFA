"use client";

import { useSession, signIn, signOut } from "next-auth/react";

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

export default function Home() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <div className="my-3">Loading...</div>;
  } else if (session) {
    return (
      <div className="my-3">
        Logged in as{" "}
        <span className="text-yellow-100">{session.user.email}</span>{" "}
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut());
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="my-3">
      Not logged in.
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        onClick={() => signIn("keycloak")}
      >
        Log in
      </button>
    </div>
  );
}
