import React, { PropsWithChildren, useMemo, useRef, useState } from "react";
import { IQueueTransactionInfo } from "../../types";
import { SetOracleTokensReponse } from "@coin98/payment_admin";
import useSetTokensPriceQuery from "../hooks/useTokensPriceQuery";
import { CHAIN_DATA } from "@/common/constants";
import { CHAIN_TYPE } from "@/common/chainIds";
import { PaymentService } from "../../service/PaymentService";
import { LoggerProvider } from "@/logger";
import { ApproveModal } from "../components/ApproveModal";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useDashboardContext } from "../../components/DashboardProvider";
import _get from "lodash-es/get";
import _first from "lodash-es/first";

export interface ISetTokenPriceContext {
  setCurrentRow: (value: IQueueTransactionInfo<SetOracleTokensReponse>) => void;
  setIsApproveAll: (value: boolean) => void;
  data: IQueueTransactionInfo<SetOracleTokensReponse>[];
}

export const SetTokensPriceContext = React.createContext(
  {} as ISetTokenPriceContext
);
const SetTokensPriceProvider = ({ children }: PropsWithChildren) => {
  const [currentRow, setCurrentRow] =
    useState<IQueueTransactionInfo<SetOracleTokensReponse> | null>();
  const [isApproveAll, setIsApproveAll] = useState<boolean>(false);
  const { data: tokensPriceData  } = useSetTokensPriceQuery();
  const {
    keyword,
    showApproveModal,
    setShowApproveModal,
    setShowCancelModal,
    approveTx,
  } = useDashboardContext();
  const paymentService = useRef<PaymentService>(new PaymentService()).current;
  const { toast } = useToast();

  const approveTransaction = async () => {
    try {
      const id = _get(currentRow, ["id"], "");
      const contractAddress = _get(
        currentRow,
        ["data", "transaction", "contractAddress"],
        ""
      );
      const encodedTxData = _get(
        currentRow,
        ["data", "transaction", "data"],
        ""
      );

      await approveTx({
        contractAddress,
        encodedTxData,
      });
      toast({
        title: "Tx successfully",
      });
      setShowApproveModal(false);
    } catch (error) {
      console.log("Edit action error: ", error);
    }
  };

  const approveAllTransactions = async () => {
    try {
      const tomoChainData = CHAIN_DATA[CHAIN_TYPE.tomo];
      const multiCallData = await paymentService.getAddItemsMultiCallData(
        tomoChainData.chain
      );
      const contractAddress = _get(multiCallData, ["address"], "");
      const encodedTxData = _get(multiCallData, ["data"], "");
      const txHash = await approveTx({
        contractAddress,
        encodedTxData,
      });

      await paymentService.removeAddItems([]);
      toast({
        title: "Tx successfully",
      });
      setShowApproveModal(false);
    } catch (error) {
      LoggerProvider.log(error);
      toast({
        title: "Tx failed",
        variant: "destructive",
      });
    }
  };

  const data = useMemo(() => {
    if (!keyword) return tokensPriceData;
    const filteredData = tokensPriceData.filter(
      (item: IQueueTransactionInfo<SetOracleTokensReponse>) => {
        const txData = _first(_get(item, ["data", "data"], []));
        const searchFields = [
          _get(txData, "tokenAddress", ""),
          _get(txData, "oracleAddress", ""),
        ];
        return searchFields.some((item) =>
          item.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    );
    return filteredData;
  }, [keyword, tokensPriceData]);

  const modalData = isApproveAll
    ? tokensPriceData
    : currentRow
      ? [currentRow]
      : [];

  const onCloseModal = () => {
    setShowApproveModal(false);
    setShowCancelModal(false);
  };

  const approveCallback = isApproveAll
    ? approveAllTransactions
    : approveTransaction;

  return (
    <SetTokensPriceContext.Provider
      value={{
        setCurrentRow,
        data,
        setIsApproveAll,
      }}
    >
      <ApproveModal
        title="Approve Transaction"
        description="Approve set token price transaction"
        onApprove={approveCallback}
        onClose={onCloseModal}
        onOpenChange={setShowApproveModal}
        data={modalData}
        open={showApproveModal}
      />
      {children}
    </SetTokensPriceContext.Provider>
  );
};

export default SetTokensPriceProvider;
