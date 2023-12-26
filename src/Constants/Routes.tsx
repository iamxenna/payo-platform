import { Index } from "Pages/Index/Index";
import { Showcase } from "Pages/Showcase/Showcase";
import { Profile } from "Pages/Profile/Info/Profile";
import { ReactElement } from "react";
import { CardInfo } from "Pages/Card/Info/CardInfo";
import { CardUpdate } from "Pages/Card/Update/CardUpdate";
import { CardCreate } from "Pages/Card/Create/CardCreate";
import { ProfileUpdate } from "Pages/Profile/Update/ProfileUpdate";
import { NotFound } from "Pages/404/404";
import { GroupCreate } from "Pages/Group/Create/GroupCreate";
import { GroupUpdate } from "Pages/Group/Update/GroupUpdate";
import { GroupInfo } from "Pages/Group/Info/GroupInfo";
import { Deleted } from "Pages/Deleted/Deleted";
import { Redirect } from "Pages/Redirect/Redirect";
import { MerchantShowcase } from "Pages/Merchant/MerchantShowcase/MerchantShowcase";
import { Dashboard } from "Pages/Dashboard/Dashboard";
import { Partnership } from "Pages/Partnership/Partnership";
import { MerchantCard } from "Pages/Merchant/MerchantCard/MerchantCard";
import { MerchantGroup } from "Pages/Merchant/MerchantGroup/MerchantGroup";

export interface IRoutes {
  path: string;
  title: string;
  page: ReactElement<any, any>;
  layoutType: "default" | "withoutSidebar";
  withHelp: boolean;
  routeType: "public" | "protected" | "unauthorized";
}

const Routes: IRoutes[] = [
  {
    title: "index",
    path: "/",
    page: <Index />,
    layoutType: "withoutSidebar",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "showcase",
    path: "/showcase",
    page: <Showcase />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "profile",
    path: "/profile",
    page: <Profile />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "profileUpdate",
    path: "/profile/update",
    page: <ProfileUpdate />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "card",
    path: "/card/:id",
    page: <CardInfo />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "cardUpdate",
    path: "/card/:id/update",
    page: <CardUpdate />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "cardCreate",
    path: "/cards/create",
    page: <CardCreate />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "groupCreate",
    path: "/groups/create",
    page: <GroupCreate />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "group",
    path: "/group/:id",
    page: <GroupInfo />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "groupUpdate",
    path: "/group/:id/update",
    page: <GroupUpdate />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "dashboard",
    path: "/dashboard",
    page: <Dashboard />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "partnership",
    path: "/partnership",
    page: <Partnership />,
    layoutType: "default",
    withHelp: true,
    routeType: "public",
  },
  {
    title: "merchantCard",
    path: "/:userName/card/:id",
    page: <MerchantCard />,
    layoutType: "withoutSidebar",
    withHelp: true,
    routeType: "unauthorized",
  },
  {
    title: "merchantShowcase",
    path: "/:userName/showcase/:id",
    page: <MerchantShowcase />,
    layoutType: "withoutSidebar",
    withHelp: true,
    routeType: "unauthorized",
  },
  {
    title: "merchantGroup",
    path: "/:userName/group/:id",
    page: <MerchantGroup />,
    layoutType: "withoutSidebar",
    withHelp: true,
    routeType: "unauthorized",
  },
  {
    title: "notFoundShowcase",
    path: "/deleted",
    page: <Deleted />,
    layoutType: "withoutSidebar",
    withHelp: false,
    routeType: "unauthorized",
  },
  {
    title: "redirect",
    path: "/redirect",
    page: <Redirect />,
    layoutType: "withoutSidebar",
    withHelp: false,
    routeType: "unauthorized",
  },
  {
    title: "notFound",
    path: "*",
    page: <NotFound />,
    layoutType: "withoutSidebar",
    withHelp: false,
    routeType: "unauthorized",
  },
];

export default Routes;
