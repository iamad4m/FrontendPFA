"use client";
import React from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const SessionProviderWrapper = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  // SessionProvider is only used in a client component
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default SessionProviderWrapper;
