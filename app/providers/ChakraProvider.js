"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export function ChakraWrapper({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Toaster />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
