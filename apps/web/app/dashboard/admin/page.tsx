"use client";
import PageWrapper from "./components/PageWrapper";
import SetAdminProvider from "./provider/AdminProvider";

export default function AdminPage() {
  return (
    <SetAdminProvider>
      <PageWrapper />
    </SetAdminProvider>
  );
}
