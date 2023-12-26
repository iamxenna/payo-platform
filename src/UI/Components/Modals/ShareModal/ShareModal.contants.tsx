import {
  Discord,
  Facebook,
  Instagram,
  Linkedin,
  Telegram,
  Tiktok,
  Twitter,
  Wechat,
  Whatsapp,
} from "Components/Assets/ServicesLogos";

export const Services = {
  WhatsApp: { icon: <Whatsapp />, to: "https://api.whatsapp.com/send/?text=" },
  Telegram: { icon: <Telegram />, to: "https://t.me/share/url?url=" },
  Instagram: { icon: <Instagram />, to: "https://www.instagram.com/" },
  Facebook: { icon: <Facebook />, to: "https://www.facebook.com/dialog/share?app_id=87741124305&href=" },
  Linkedin: { icon: <Linkedin />, to: "https://www.linkedin.com/sharing/share-offsite/?url=" },
  Twitter: { icon: <Twitter />, to: "https://twitter.com/intent/tweet?url=" },
  TikTok: { icon: <Tiktok />, to: "https://www.tiktok.com/" },
  WeChat: { icon: <Wechat />, to: "https://www.wechat.com/" },
  Discord: { icon: <Discord />, to: "https://discord.com/" },
} as const;

export const AllowedServices = ["WhatsApp", "Telegram", "Facebook", "Linkedin", "Twitter"];
