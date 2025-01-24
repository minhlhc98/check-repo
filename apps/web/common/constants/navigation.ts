import { ISidebarItem } from "@/components/app-sidebar";

export const SIDEBAR_DATA: { navMain: ISidebarItem[] } = {
  navMain: [
    {
      title: "Admin",
      iconName: "user",
      url: "/dashboard/admin",
      items: [],
    },
    {
      title: "Partner",
      iconName: "share",
      url: "/dashboard/partner",
      items: [],
    },
    {
      title: "Token",
      iconName: "c98Exchange",
      url: "/dashboard/token",
      items: [],
    },
    {
      title: "Token Price",
      iconName: "c98_wallet",
      url: "/dashboard/token-price",
      items: [],
    },
    // {
    //   title: "Admin Actions",
    //   url: "",
    //   iconName: "setting",
    //   items: [
    //     {
    //       title: "Set Admin",
    //       url: "/dashboard/actions/set-admin",
    //     },
    //     {
    //       title: "Add Token",
    //       url: "/dashboard/actions/add-token",
    //     },
    //     {
    //       title: "Add Partner",
    //       url: "/dashboard/actions/add-partner",
    //     },
    //     {
    //       title: "Set Token Price",
    //       url: "/dashboard/actions/set-token-price",
    //     },
    //   ],
    // },
  ],
};

export const PAGE_NAVIGATIONS = {
  LOGIN: "/login",
  ADD_TOKEN: SIDEBAR_DATA.navMain[0]?.url,
};