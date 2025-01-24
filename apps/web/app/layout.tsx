import "@workspace/ui/globals.css";
import localFont from "next/font/local";
import "@/global.css";
import WrapperPage from "./wrapper";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  // variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased `}>
        <WrapperPage>{children}</WrapperPage>
      </body>
    </html>
  );
}
