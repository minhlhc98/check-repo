'use client';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import _size from 'lodash-es/size';
import _get from 'lodash-es/get';
import { Icon } from '@/components/Icon';
import { SIDEBAR_DATA } from '@/constants/navigation';

// This is sample data.
export interface ISidebarItem {
  title: string;
  url: string;
  iconName?: string;
  items?: ISidebarItem[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, toggleSidebar, isMobile } = useSidebar();

  const closeSideBar = () => {
    if (state === 'expanded' && isMobile) {
      toggleSidebar();
    }
  };

  const onItemClick = (item: ISidebarItem) => () => {
    const { url } = item;
    closeSideBar();
  };

  const renderCollapsableItem = (sidebarItemData: ISidebarItem) => {
    const { title, iconName, items = [] } = sidebarItemData;
    return (
      <Collapsible key={title} className="group/collapsible">
        <SidebarGroup>
          <SidebarMenuButton className="text-sm" asChild>
            <CollapsibleTrigger>
              <div className="size-5 flex justify-center items-center">
                {iconName && <Icon iconName={iconName} className="text-xl" />}
              </div>
              {title}
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  return (
                    <SidebarMenuSub key={item.title}>
                      <SidebarMenuButton
                        onClick={onItemClick(item)}
                        isActive={false}
                      >
                        {/* <Link href={}>{item.title}</Link> */}
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuSub>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <img
          src={require('../assets/images/logoAdmin.svg')}
          width={160}
          height={40}
          alt="logo"
        />
      </SidebarHeader>
      <SidebarContent className="gap-y-0">
        {/* We create a SidebarGroup for each parent. */}
        {SIDEBAR_DATA.navMain.map((item) => {
          const childItems = _get(item, 'items', []);
          const itemCount = _size(childItems);
          // const isActive = pathname === item.url;
          if (itemCount > 0) {
            return renderCollapsableItem(item);
          }

          return (
            <SidebarGroup key={item.title}>
              <SidebarMenuButton
                onClick={onItemClick(item)}
                // isActive={isActive}
                className="text-sm cursor-pointer"
              >
                <div className="size-5 flex justify-center items-center">
                  {item.iconName && (
                    <Icon iconName={item.iconName} className="text-xl" />
                  )}
                </div>
                {item.title}
              </SidebarMenuButton>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
