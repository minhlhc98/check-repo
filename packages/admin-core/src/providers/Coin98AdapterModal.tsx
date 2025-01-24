// modal.tsx
import { viction } from "@coin98-com/wallet-adapter-react-ui";

import React from 'react'
import WalletModalC98 from "@coin98-com/wallet-adapter-react-ui"

const Coin98AdapterModal = () => {
  //   const defaultChains = [...evmChains]; // multi-chain
  const defaultChains = [viction]; // single-chains
  return (
    <WalletModalC98.WalletModalC98
      isC98Theme
      isHiddenSocial
      enableChains={defaultChains}
      overlayClass="backdrop-filter-none bg-background-overlay duration-500"
      // layoutClass="text-text-primary bg-background-surface [&_.svg-icon]:filter-none [&_.c98-bg-bkg-secondary]:bg-background-white [&_.c98-bg-bkg-primary]:bg-background-input [&_.svg-active]:bg-[#D4DACE] [&_.svg-active>p]:text-brand-primary"
      // overlayClass="backdrop-filter-none bg-background-overlay duration-500"
    />
  );
};

export default Coin98AdapterModal;
