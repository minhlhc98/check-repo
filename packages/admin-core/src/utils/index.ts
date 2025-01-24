import { CHAIN_DATA } from '@wallet/constants';
import BigNumber from 'bignumber.js';
import _get from 'lodash-es/get';

export const formatAddress = (address: string, length = 6) => {
  if (!address) return '';

  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const getChainSymbol = (chain: string) =>
  _get(_get(CHAIN_DATA, chain), 'symbol', '');

export const formatReadableNumber = (
  value: number | string,
  options: {
    isTokenAmount?: boolean;
    locale?: string;
    currency?: string;
    isCompact?: boolean;
    threshold?: number;
  } = {}
) => {
  const parseNumber = typeof value === 'string' ? parseFloat(value) : value;
  const {
    isTokenAmount = false,
    locale = 'en-US',
    isCompact = false,
    threshold = 1e4,
  } = options;

  const isOverThreshold = parseNumber >= threshold;

  let decimal = isTokenAmount ? 4 : 2;

  if (isOverThreshold && isCompact) {
    decimal = 0;
  }

  const formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimal,

    ...(isOverThreshold && isCompact && { notation: 'compact' }),
  }).format(parseNumber);

  return formattedNumber;
};

export const convertWeiToBalance = (
  amount: string | number,
  decimal = 18
): BigNumber => {
  const bigDecimal = BigNumber(10).pow(decimal);
  const convertedAmount = new BigNumber(amount);

  return convertedAmount.div(bigDecimal);
};

export const getChainNameById = (chainId: string) => {
  const chain = Object.keys(CHAIN_DATA).find(
    (it) => _get(CHAIN_DATA, `${it}.chainId`, '') === chainId
  );
  return (chain ? _get(CHAIN_DATA, `${chain}.name`, '') : '') as string;
};

export const getChainById = (chainId: string) => {
  const chain = Object.keys(CHAIN_DATA).find(
    (it) => _get(CHAIN_DATA, `${it}.chainId`, '') === chainId
  );
  return chain || '';
};

