"use client";
import PageWrapper from "./components/PageWrapper";
import AddPartnerProvider from "./provider/PartnerProvider";

export default function PartnerPage() {
  return (
    <AddPartnerProvider>
      <PageWrapper />
    </AddPartnerProvider>
  );
}
