"use client";
import PageWrapper from "./components/PageWrapper";
import AddTokenProvider from "./provider/AddItemsProvider";

export default function TokenPage() {
  return (
    <AddTokenProvider>
      <PageWrapper />
    </AddTokenProvider>
  );
}
