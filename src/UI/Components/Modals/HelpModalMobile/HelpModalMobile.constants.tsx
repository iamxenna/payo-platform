import { Telegram } from "Components/Assets/ShareModalMobileAssets";
import { Insta } from "Components/Assets/ShareModalMobileAssets";
import { Twitter } from "Components/Assets/ShareModalMobileAssets";
import { Linkedin } from "Components/Assets/ShareModalMobileAssets";
import { Github } from "Components/Assets/ShareModalMobileAssets";
import { Document } from "Components/Assets/ShareModalMobileAssets";
import { Message } from "Components/Assets/ShareModalMobileAssets";
import { Terms } from "Components/Assets/ShareModalMobileAssets";

export const SOCIAL_NETWORKS = (theme: "dark" | "light") => {
  const color = theme === "light" ? "#100C1A" : "#F9F6FF";

  return [
    {
      icon: <Telegram color={color} />,
      link: "https://t.me/payo_one",
    },
    {
      icon: <Insta color={color} />,
      link: "https://www.instagram.com/one.payo/",
    },
    {
      icon: <Twitter color={color} />,
      link: "https://twitter.com/payo_one",
    },
    {
      icon: <Linkedin color={color} />,
      link: "https://www.linkedin.com/company/payo-one/",
    },
    {
      icon: <Github color={color} />,
      link: "https://github.com/PAYO-ONE",
    },
  ];
};

export const HELP_MENU = (theme: "dark" | "light") => {
  const color = theme === "light" ? "#100C1A" : "#F9F6FF";

  return [
    {
      text: "helpMenu.help",
      icon: <Document color={color} />,
      link: "https://www.notion.so/murphywl/PUBLIC-PAYO-57947f2182b8446999e816d83bc5e014#bea21b19dbae4f6a9ca32258cba9c728",
      border: true,
    },
    {
      text: "helpMenu.support",
      icon: <Message color={color} />,
      border: true,
    },
    {
      text: "helpMenu.terms",
      icon: <Terms color={color} />,
      link: "https://www.notion.so/murphywl/PUBLIC-PAYO-57947f2182b8446999e816d83bc5e014#b53d91ad5f3f491c85092c648b473e5c",
      border: false,
    },
  ];
};
