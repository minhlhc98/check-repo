import React, { PropsWithChildren, useMemo, useRef, useState } from "react";
import { IQueueTransactionInfo } from "../../types";
import { AddItemResponse } from "@coin98/payment_admin";
// import { useAppContext } from "@/providers/AppProvider";
import { PaymentService } from "../../service/PaymentService";
import { CHAIN_DATA, QUERY_KEYS } from "@/common/constants";
import { CHAIN_TYPE } from "@/common/chainIds";
import _get from "lodash-es/get";
import ApproveModal from "../components/ApproveModal";
import { LoggerProvider } from "@/logger";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createTxExplorerLink } from "@/common/functions";
import { useDashboardContext } from "../../components/DashboardProvider";
import useAddItemsQuery from "../hooks/useAddItemsQuery";
import _first from "lodash-es/first";

export interface IAddItemsContext {
  data: IQueueTransactionInfo<AddItemResponse>[];
  setCurrentRow: (value: IQueueTransactionInfo<AddItemResponse>) => void;
  setIsApproveAll: (value: boolean) => void;
}

export const AddItemsContext = React.createContext({} as IAddItemsContext);
const AddItemsProvider = ({ children }: PropsWithChildren) => {
  const [currentRow, setCurrentRow] =
    useState<IQueueTransactionInfo<AddItemResponse> | null>();
  const [isApproveAll, setIsApproveAll] = useState<boolean>(false);
  // const { activeAddress } = useAppContext();
  const paymentService = useRef<PaymentService>(new PaymentService()).current;
  const {
    keyword,
    approveTx,
    setShowApproveModal,
    setShowCancelModal,
    showApproveModal,
    showCancelModal,
  } = useDashboardContext();
  const { data: addItemData } = useAddItemsQuery();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigation = useRouter();

  const refreshData = async () => {
    await queryClient.refetchQueries({
      queryKey: [QUERY_KEYS.addTokenTxQuery],
    });
    navigation.push("/dashboard/token");
  };

  const data = useMemo(() => {
    if (!keyword) return addItemData;
    const filteredData = addItemData.filter(
      (item: IQueueTransactionInfo<AddItemResponse>) => {
        const txData = _first(_get(item, ["data", "data"], []));
        const conditions = [
          _get(txData, ["itemInfo", "partnerCode"], ""),
          _get(txData, ["itemInfo", "tokenAddress"], ""),
        ];
        return conditions.some((condition) =>
          condition.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    );
    return filteredData;
  }, [keyword, addItemData]);

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
      setShowApproveModal(true);
      const txHashData = await approveTx({ contractAddress, encodedTxData });
      if (txHashData.isError) {
        throw txHashData.error;
      }
      await paymentService.removeAddItems([id]);
      await refreshData();
      toast({
        title: "Approved successfully",
        description: (
          <a
            target="_blank"
            rel="noreferrer"
            href={createTxExplorerLink(CHAIN_TYPE.tomo, txHashData?.data || "")}
          >
            {txHashData?.data || ""}
          </a>
        ),
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
      setShowApproveModal(true);
      const txHashData = await approveTx({
        contractAddress: multiCallData?.address,
        encodedTxData: multiCallData?.data,
      });
      if (txHashData.isError) {
        throw txHashData.error;
      }
      await paymentService.removeAddItems([]);
      await refreshData();
      setShowApproveModal(false);
      toast({
        title: "Approved successfully",
        description: (
          <a
            target="_blank"
            rel="noreferrer"
            href={createTxExplorerLink(CHAIN_TYPE.tomo, txHashData?.data || "")}
          >
            {txHashData?.data || ""}
          </a>
        ),
      });
    } catch (error) {
      LoggerProvider.log(error);
    }
  };

  const modalData = isApproveAll ? data : currentRow ? [currentRow] : [];

  const approveCallback = isApproveAll
    ? approveAllTransactions
    : approveTransaction;

  const onCloseModal = () => {
    setShowApproveModal(false);
    setShowCancelModal(false);
  };

  return (
    <AddItemsContext.Provider
      value={{
        setIsApproveAll,
        setCurrentRow,
        data,
      }}
    >
      <ApproveModal
        title="Approve Transaction"
        description="Approve add items transaction"
        onApprove={approveCallback}
        onClose={onCloseModal}
        onOpenChange={setShowApproveModal}
        data={modalData}
        open={showApproveModal}
      />
      {children}
    </AddItemsContext.Provider>
  );
};

export default AddItemsProvider;
