// Configure blockchains, wallets then wrap app with WalletProvider, WalletModalProvider
import React from 'react'
import {
  BLOCKCHAINS_DATA,
  WalletProvider,
} from '@coin98-com/wallet-adapter-react';
import { WalletModalProvider } from '@coin98-com/wallet-adapter-react-ui';
import { Coin98WalletAdapter } from '@coin98-com/wallet-adapter-coin98';

interface ContainerProps {
  children: React.ReactNode;
}

const Coin98AdapterProvider: React.FC<ContainerProps> = ({ children }) => {
  const enables = [BLOCKCHAINS_DATA.ethereum, BLOCKCHAINS_DATA.solana];
  const wallets = [Coin98WalletAdapter];
//   const { toast } = useToast();

  const handleError = (error: unknown) => {
    // toast({ variant: 'danger', message: error?.message || 'System error' });
    console.log(error)
  };

  return (
    <WalletProvider
      wallets={wallets}
      enables={enables}
      autoConnect
      onError={handleError}
    >
      <WalletModalProvider isC98Theme>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default Coin98AdapterProvider;
