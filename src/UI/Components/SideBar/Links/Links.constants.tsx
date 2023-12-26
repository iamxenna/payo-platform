import { User, Monitor, Bag } from "../../Assets";

interface IElements {
  icon: any;
  path: string;
  title: string;
}

const generateElements = (path: string, isMobile: boolean): IElements[] => [
  {
    icon: <Bag active={path === "/showcase"} isMobile={isMobile} />,
    path: "/showcase",
    title: "showcase",
  },
  {
    icon: <Monitor active={path === "/dashboard"} isMobile={isMobile} />,
    path: "/dashboard",
    title: "dashboard",
  },
  {
    icon: <User active={path === "/partnership"} isMobile={isMobile} />,
    path: "/partnership",
    title: "partnership",
  },
];

export { generateElements };
