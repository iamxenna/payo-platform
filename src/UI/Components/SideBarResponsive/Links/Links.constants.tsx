import { Showcase } from "Components/Assets/SideBarResponsive/Showcase";
import { Dashboard } from "Components/Assets/SideBarResponsive/Dashboard";
import { Partnership } from "Components/Assets/SideBarResponsive/Partnership";
import { Profile } from "Components/Assets/SideBarResponsive/Profile";

interface IElements {
  icon: any;
  path: string;
  title: string;
}

const generateMobileElements = (path: string, isMobile: boolean): IElements[] => [
  {
    icon: <Showcase active={path === "/showcase"} isMobile={isMobile} />,
    path: "/showcase",
    title: "showcase",
  },
  {
    icon: <Dashboard active={path === "/dashboard"} isMobile={isMobile} />,
    path: "/dashboard",
    title: "dashboard",
  },
  {
    icon: <Partnership active={path === "/partnership"} isMobile={isMobile} />,
    path: "/partnership",
    title: "partnership",
  },
  {
    icon: <Profile active={path === "/profile"} isMobile={isMobile} />,
    path: "/profile",
    title: "profile",
  },
];

export { generateMobileElements };
