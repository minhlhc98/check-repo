import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AUTH_TYPES } from "@/types";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import ButtonConnectWallet from "@/components/ButtonConnectWallet";
import UserInfo from "@/components/UserInfo";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {AdminCoreProvider} from "@/providers/MainProvider";
import { useAdminCoreContext } from "@/hooks/useAdminCoreContext";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { disconnect } = useWallet();
  const { setIsAuthenticated, dropUserProfile } = useAdminCoreContext()
  // const [breadcrumbTitle, setBreadcrumbTitle] = useState<string>('')

  const breadcrumbTitle = React.useMemo(() => {
    return ''
  }, []);

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

  const handleSignOut = async () => {
    setIsAuthenticated(false)
    await dropUserProfile()
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
        <AdminCoreProvider>{children}</AdminCoreProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
