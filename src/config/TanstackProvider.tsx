"use client";
import React, { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanstackProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient();
const TanstackProvider: React.FC<TanstackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
