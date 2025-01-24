"use client";

import { AppSidebar } from "./app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import ButtonConnectWallet from "./ButtonConnectWallet";
import UserInfo from "../app/dashboard/components/UserInfo";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { AUTH_TYPES } from "@workspace/api-service";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import React, { useEffect } from "react";
import _last from "lodash-es/last";
import _get from 'lodash-es/get'
import { getPageTitle } from "../common/functions";
import {decodeJwt} from 'jose'

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const router = useRouter();
  const currentPathName = usePathname();
  const { disconnect } = useWallet();

  const validateToken = () => {
    try {
      const currentTimestamp = Date.now()
      const localAccessToken = localStorage.getItem(AUTH_TYPES.BASE_JWT) || ''
      console.log('localAccessToken', localAccessToken)
      const accessToken = decodeJwt(localAccessToken)
      const expTime = _get(accessToken, 'exp', 0) * 1000
      const gapTime =  expTime - currentTimestamp
      if (gapTime <= 1000 * 60 * 15) {
        throw new Error('Failed authentication: Invalid token')
      }
      router.push("/coin-data");
    } catch (error) {
      console.log(error)
      // localStorage.removeItem(AUTH_TYPES.BASE_JWT)
      // localStorage.removeItem(AUTH_TYPES.ON_CHAIN_SIGNATURE)
      router.push("/signin");
    }
  }

  useEffect(() => {
    validateToken()
  }, []);

  const renderBreadcrumbList = () => {
    const sectionsList = (currentPathName || "")
      .split("/")
      .filter((item) => !!item);
    return (
      <BreadcrumbList>
        {sectionsList.map((section, index) => {
          const isLast = _last(sectionsList) === section;
          const breadcrumbTitle = getPageTitle(section);
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {breadcrumbTitle}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    );
  };

  const handleSignOut = () => {
    router.replace("/signin");
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
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
