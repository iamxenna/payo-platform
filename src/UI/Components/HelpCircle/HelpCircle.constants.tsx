import { Instagram } from "Components/Assets/Social/Instagram";
import { LinkedIn } from "Components/Assets/Social/LinkedIn";
import { Telegram } from "Components/Assets/Social/Telegram";
import { GitHub } from "Components/Assets/Social/GitHub";
import { Twitter } from "Components/Assets/Social/Twitter";
import { Documents } from "Components/Assets/Documents";
import { Message } from "Components/Assets/Message";
import { Terms } from "Components/Assets/Terms";

export const SOCIAL_NETWORKS = (theme: "dark" | "light") => {
  const color = theme === "light" ? "#100C1A" : "#F9F6FF";

  return [
    {
      icon: <Telegram color={color} />,
      link: "https://t.me/payo_one",
    },
    {
      icon: <Instagram color={color} />,
      link: "https://www.instagram.com/one.payo/",
    },
    {
      icon: <Twitter color={color} />,
      link: "https://twitter.com/payo_one",
    },
    {
      icon: <LinkedIn color={color} />,
      link: "https://www.linkedin.com/company/payo-one/",
    },
    {
      icon: <GitHub color={color} />,
      link: "https://github.com/PAYO-ONE",
    },
  ];
};

export const HELP_MENU = (theme: "dark" | "light") => {
  const color = theme === "light" ? "#100C1A" : "#F9F6FF";

  return [
    {
      text: "helpMenu.help",
      icon: <Documents color={color} />,
      link: "https://murphywl.notion.site/Help-tutorials-documentation-159881cbdb7640779182445e75aaca7a",
    },
    {
      text: "helpMenu.support",
      icon: <Message color={color} />,
    },
    {
      text: "helpMenu.terms",
      icon: <Terms color={color} />,
      link: "https://murphywl.notion.site/Terms-and-Privacy-4e6ed097b9384bab82345c15457e5ce2",
    },
  ];
};
