"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_TYPES } from "@coin98/api_service";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import ButtonConnectWallet from "@/components/ButtonConnectWallet";
import UserInfo from "@/app/dashboard/components/UserInfo";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@workspace/ui/components/button";
import { getBreadcrumbTitle } from "@/common/utils/navigation";
import { SIDEBAR_DATA } from "@/common/constants";
import DashboardProvider from "./components/DashboardProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const curPathname = usePathname();
  const nextRouter = useRouter();
  const { disconnect } = useWallet();
  // const [breadcrumbTitle, setBreadcrumbTitle] = useState<string>('')

  const breadcrumbTitle = React.useMemo(() => {
    return getBreadcrumbTitle(curPathname, SIDEBAR_DATA.navMain, "");
  }, [curPathname]);

  const renderBreadcrumbList = () => {
    // const sectionsList = (curPathname || "")
    //   .split("/")
    //   .filter((item) => !!item);
    return (
      <BreadcrumbList>
        {/* {sectionsList.map((section, index) => {
          const isLast = _last(sectionsList) === section;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {breadcrumbTitle || ''}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })} */}
        {breadcrumbTitle || ""}
      </BreadcrumbList>
    );
  };

  const handleSignOut = () => {
    nextRouter.replace("/login");
    localStorage.removeItem(AUTH_TYPES.BASE_JWT);
    disconnect();
  };

  return (
    <SidebarProvider className="h-svh">
      <AppSidebar className="flex-none" />
      <SidebarInset className="max-w-full w-full h-full overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 flex-none">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>{renderBreadcrumbList()}</Breadcrumb>
          <div className="flex-grow flex justify-end items-center gap-2">
            <ButtonConnectWallet>
              <UserInfo />
            </ButtonConnectWallet>
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </header>
        <DashboardProvider>{children}</DashboardProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
