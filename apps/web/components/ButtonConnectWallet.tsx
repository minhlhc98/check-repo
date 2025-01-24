"use client";
import { Button } from "@workspace/ui/components/button";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import React, { FunctionComponent } from "react";

interface IButtonConnectWallet {
  children: React.ReactNode;
}

const ButtonConnectWallet: FunctionComponent<IButtonConnectWallet> = ({
  children,
}) => {
  const { openWalletModal } = useWalletModal();
  const { connected } = useWallet();

  if (!connected) {
    return <Button onClick={openWalletModal}>Connect Wallet</Button>;
  }
  return children;
};

export default ButtonConnectWallet;
