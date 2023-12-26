import { ReactNode } from "react";
import {
  Instagram,
  Telegram,
  WhatsApp,
  Facebook,
  LinkedIn,
  Twitter,
  Link,
} from "../UI/Components/Assets/ProfileSocials";
import { BNB, BUSD, USDC, USDT, DAI, ETH, MATIC } from "../UI/Components/Assets/Tokens";

const slIcons = {
  instagram: (w?: string, h?: string) => <Instagram width={w} height={h} />,
  telegram: (w?: string, h?: string) => <Telegram width={w} height={h} />,
  whatsApp: (w?: string, h?: string) => <WhatsApp width={w} height={h} />,
  facebook: (w?: string, h?: string) => <Facebook width={w} height={h} />,
  linkedIn: (w?: string, h?: string) => <LinkedIn width={w} height={h} />,
  twitter: (w?: string, h?: string) => <Twitter width={w} height={h} />,
  else: (w?: string, h?: string) => <Link width={w} height={h} />,
};

const tokens: { [key: string]: ReactNode } = {
  BNB: <BNB />,
  ETH: <ETH />,
  BUSD: <BUSD />,
  USDC: <USDC />,
  USDT: <USDT />,
  DAI: <DAI />,
  MATIC: <MATIC />,
};

export { slIcons, tokens };
