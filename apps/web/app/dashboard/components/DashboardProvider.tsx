import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import React, { PropsWithChildren, useState } from "react";
import { CHAIN_DATA } from "@/common/constants";
import { CHAIN_TYPE } from "@/common/chainIds";
import { useAppContext } from "@/providers/AppProvider";
import { estimateGas } from "@/common/utils/gasUtils";
import { LoggerProvider } from "@/logger";
import { useWallet } from "@coin98-com/wallet-adapter-react";

interface IApproveParams {
  contractAddress: string;
  encodedTxData: string;
}

interface IDashboardContext {
  setKeyword: (value: string) => void;
  setShowApproveModal: (value: boolean) => void;
  setShowCancelModal: (value: boolean) => void;
  approveTx: (params: IApproveParams) => Promise<{
    data: string;
    error: unknown;
    isError: boolean;
  }>;
  keyword: string;
  showApproveModal: boolean;
  showCancelModal: boolean;
}

const DashboardContext = React.createContext({} as IDashboardContext);

export const useDashboardContext = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error("Dashboard context is not available");
  }
  return context;
};

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [keyword, setKeyword] = useState<string>("");
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const debouncedKeyWord = useDebouncedValue(keyword);
  const { activeAddress, onSwitchNetwork } = useAppContext();
  const { sendTransaction } = useWallet();

  const checkSwitchChain = async () => {
    let tomoChainData = undefined;
    for (const item in CHAIN_DATA) {
      if (item === CHAIN_TYPE.tomo) {
        tomoChainData = CHAIN_DATA[item];
      }
    }

    if (
      tomoChainData?.chainId &&
      activeAddress?.chainId &&
      activeAddress?.chainId !== tomoChainData?.chainId
    ) {
      await onSwitchNetwork?.(tomoChainData?.chainId);
    }
  };

  const approveTx = async ({
    contractAddress,
    encodedTxData,
  }: IApproveParams) => {
    await checkSwitchChain();
    const chainData =
      CHAIN_DATA[activeAddress?.chain as keyof typeof CHAIN_DATA];
    const txInfo = {
      data: encodedTxData,
      to: contractAddress,
      from: activeAddress?.address,
    } as Record<string, unknown>;

    const chainRPC = "rpcURL" in chainData ? chainData?.rpcURL : null;
    if (!chainRPC) {
      throw new Error("Chain RPC is not found");
    }

    const txGas = await estimateGas({
      generateTsx: txInfo,
      rpc: chainRPC,
    });
    txInfo.gasFee = txGas;

    const txData = await sendTransaction(txInfo);
    return txData;
  };

  return (
    <DashboardContext.Provider
      value={{
        keyword: debouncedKeyWord,
        showApproveModal,
        showCancelModal,
        approveTx,
        setKeyword,
        setShowApproveModal,
        setShowCancelModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
