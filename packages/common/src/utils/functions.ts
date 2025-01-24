import { chainKey } from "@coin98/payment_admin";
import { CHAIN_DATA } from "@constants/chain";
import { CHAIN_TYPE } from "@constants/chainIds";
import _get from "lodash-es/get";
import { v4 } from "uuid";

export const formatAddress = (address: string, length = 6) => {
  if (!address) return "";

  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

const txsFail = "txsFail";

export function encodeMessErr(mess: any) {
  const stringResult = mess ? mess.toString() : "";
  if (stringResult.includes("Error")) {
    let mess = txsFail;
    switch (true) {
      case stringResult.includes("0x1") ||
        stringResult.includes("Insufficient funds"):
        mess = "tradeErrFund";
        break;
      case stringResult.includes("size too small"):
        mess = "sizeTooSmall";
        break;
      case stringResult.includes("Transaction too large"):
        mess = "tooLarge";
        break;
      case stringResult.includes("0x1") ||
        stringResult.includes("Attempt to debit an account but") ||
        stringResult.includes("prior credit"):
        mess = "gasSolNotEnough";
        break;
      case stringResult.includes("the capitalization checksum"):
        mess = "";
        break;
    }
    return mess;
  } else {
    return txsFail;
  }
}

export const waitTxnUntilDone = (
  fn: () => Promise<any>,
  time = 1000,
  limit = 60
) => {
  const now = Date.now() / 1000; // in seconds

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      try {
        const isExpired = Date.now() / 1000 - now >= limit;

        if (isExpired) {
          timer && clearInterval(timer);
          reject("Timeout");
        }
        fn().then(res => {
          if (res) {
            clearInterval(timer);
            resolve(res);
          }
        });

      } catch (error) {
        clearInterval(timer);
        reject(_get(error, "message"));
      }
    }, time);
  });
};

export const sleep = (ms = 500): Promise<void> => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const getChainNameById = (chainId: string) => {
  const chain = Object.keys(CHAIN_DATA).find(
    (it) => _get(CHAIN_DATA, `${it}.chainId`, "") === chainId
  );
  return chain ? _get(CHAIN_DATA, `${chain}.name`, "") : "";
};

export const getChainById = (chainId: string) => {
  const chain = Object.keys(CHAIN_DATA).find(
    (it) => _get(CHAIN_DATA, `${it}.chainId`, "") === chainId
  );
  return chain || "";
};

export const getChainSymbol = (chain: string) =>
  _get(_get(CHAIN_DATA, chain), "symbol", "");

export const upperCaseFirstLetter = (lower: string) => {
  if (!lower) return lower;
  const upper = lower.replace(/^\w/, (chr) => chr.toUpperCase());
  return upper;
};

export const getPageTitle = (path: string) => {
  switch (path) {
    case "dashboard":
      return "Dashboard";
    case "burn-mint-token":
      return "Burn Mint Token";
    case "config":
      return "Config";
    case "coin-data":
      return "Coin Data";
  }
  return "";
};

const cacheTimes = Date.now();
export const getMainTokenImage = (chainName: string) => {
  return `https://general-inventory.coin98.tech/app/currency/${chainName}.png?cache=${cacheTimes}`;
};

export const getChainImage = (chainName: string) => {
  return `https://general-inventory.coin98.tech/app/chain/${chainName}.png?cache=${cacheTimes}`;
};

export const genUniqueTokenId = (token: any): string => {
  if (!token) {
    return v4()
  }
  return (
    _get(token, "symbol", "") +
    _get(token, "address", "") +
    _get(token, "chain", "") +
    _get(token, "_id", "")
  );
};

export const generateId = (isNumbersOnly = false): string => {
  let text = "";
  const possible = isNumbersOnly
    ? "0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getExplorerTxPrefix = (chain: chainKey) => {
  switch (chain) {
    case CHAIN_TYPE.tomo:
    case CHAIN_TYPE.victionTestnet: {
      return "tx";
    }
    default:
      return "";
  }
};

export const createTxExplorerLink = (
  chain: chainKey,
  txHash: string
) => {
  const chainData = CHAIN_DATA[chain as unknown as keyof typeof CHAIN_DATA];
  let scanUrl = _get(chainData, "scan", "");
  let prefix = "/";
  const scanTxs = _get(chainData, "scanTxs");
  if (scanTxs) {
    scanUrl += scanTxs;
  } else {
    prefix = `/${getExplorerTxPrefix(chain)}/`;
  }
  return (scanUrl + prefix + txHash).replaceAll(/\/{2}/g, "/");
};
