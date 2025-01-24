"use client";

import SetTokenPriceProvider from "./provider/TokensPriceProvider";
import PageWrapper from "./components/PageWrapper";

export default function TokenPricePage() {
  return (
    <SetTokenPriceProvider>
      <PageWrapper />
    </SetTokenPriceProvider>
  );
}
