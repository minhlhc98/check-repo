"use client";

import { Providers } from "@/providers";
import { Toaster } from "@workspace/ui/components/toaster";
import { PropsWithChildren } from "react";

const WrapperPage = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Providers>{children}</Providers>
      <Toaster />
    </>
  );
};

export default WrapperPage;
