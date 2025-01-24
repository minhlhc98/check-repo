import { CHAIN_TYPE } from "./chainIds";

export const LIST_CHAINS_SUPPORT = [
  CHAIN_TYPE.binanceSmart,
  CHAIN_TYPE.matic,
  CHAIN_TYPE.ether,
  CHAIN_TYPE.tomo,
  CHAIN_TYPE.solana,
  CHAIN_TYPE.optimism,
  CHAIN_TYPE.arbitrum,
];

export const LIST_WALLET_SUPPORT = [
  {
    name: "coin98",
    title: "Coin98 Wallet",
    description: "Multichain",
    logo: "/images/logos/coin98.svg",
    link: "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
    chainSupport: LIST_CHAINS_SUPPORT,
    isSupportMobile: true,
  },
];
