"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import Coin98AdapterProvider from "@/providers/Coin98WalletProvider";
import Coin98AdapterModal from "@/providers/Coin98AdapterModal";
// import AppProvider from "@/providers/AppProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { AdminWrapper } from "@coin98/admin_core";
// import { usePathname, useRouter } from "next/navigation";
// import { PAGE_NAVIGATIONS } from "@common/constants/navigation";
// import { useUserAuth } from "@/hooks/useUserAuth";

// let runOnce = false;
export function Providers({ children }: { children: React.ReactNode }) {
  // const nextRouter = useRouter();
  // const pathname = usePathname();
  // const { isAuthTokenValid, clearUserData } = useUserAuth();

  // React.useEffect(() => {
  //   if (!runOnce) {
  //     runOnce = true;
  //     if (!isAuthTokenValid()) {
  //       clearUserData();
  //       setTimeout(() => {
  //         nextRouter.replace(PAGE_NAVIGATIONS.LOGIN);
  //       }, 200);
  //     } else {
  //       if (["/"].includes(pathname)) {
  //         nextRouter.replace(PAGE_NAVIGATIONS.ADD_TOKEN!);
  //       }
  //     }
  //   }
  //   // TODO: This hook only runs once when the application inits
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);
  return (
    <Coin98AdapterProvider>
      <AdminWrapper isAuthenticated={false}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <QueryProvider>{children}</QueryProvider>
        </NextThemesProvider>
      </AdminWrapper>
      <Coin98AdapterModal />
    </Coin98AdapterProvider>
  );
}
