"use client";
import React from "react";

import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({ children }) => {
  // SessionProvider is only used in a client component
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
