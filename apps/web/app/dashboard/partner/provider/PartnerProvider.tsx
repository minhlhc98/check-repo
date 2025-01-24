import React, { PropsWithChildren, useMemo, useRef, useState } from "react";
import { IQueueTransactionInfo } from "../../types";
import { SetPartnerResponse } from "@coin98/payment_admin";
import usePartnerProvider from "../hooks/usePartnerQuery";
import _get from "lodash-es/get";
import { useAppContext } from "@/providers/AppProvider";
import { CHAIN_DATA, QUERY_KEYS } from "@/common/constants";
import { CHAIN_TYPE } from "@/common/chainIds";
import ApproveModal from "../components/ApproveModal";
import { PaymentService } from "../../service/PaymentService";
import { LoggerProvider } from "@/logger";
import AlertModal from "@/components/AlertModal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useDashboardContext } from "../../components/DashboardProvider";
import { createTxExplorerLink } from "@/common/functions";

export interface IPartnerContext {
  setCurrentRow: (value: IQueueTransactionInfo<SetPartnerResponse>) => void;
  data: IQueueTransactionInfo<SetPartnerResponse>[];
  setIsApproveAll: (value: boolean) => void;
}

export const PartnerContext = React.createContext({} as IPartnerContext);
const SetPartnerProvider = ({ children }: PropsWithChildren) => {
  const { data: partnerData, refetch } = usePartnerProvider();
  const {
    keyword,
    setShowApproveModal,
    setShowCancelModal,
    approveTx,
    showApproveModal,
    showCancelModal,
  } = useDashboardContext();
  const [currentRow, setCurrentRow] =
    useState<IQueueTransactionInfo<SetPartnerResponse> | null>();
  const [isApproveAll, setIsApproveAll] = useState<boolean>(false);
  const { activeAddress, onSwitchNetwork } = useAppContext();
  const paymentService = useRef<PaymentService>(new PaymentService()).current;
  const queryClient = useQueryClient();
  const navigation = useRouter();
  const { toast } = useToast();

  const data = useMemo(() => {
    if (!keyword) {
      return partnerData;
    }
    const filteredData = partnerData.filter(
      (item: IQueueTransactionInfo<SetPartnerResponse>) => {
        const txData = _get(item, ["data", "data"]);
        if (!txData) return false;
        const partnerCode = _get(txData, "partnerCode");
        const ownerAddress = _get(txData, ["partnerInfo", "owner"]);
        const feeReceiver = _get(txData, ["partnerInfo", "feeReceiver"]);
        const conditions = [partnerCode, ownerAddress, feeReceiver].filter(
          (item) => !!item
        );
        return conditions.some((item) =>
          item.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    );
    return filteredData;
  }, [keyword, partnerData]);

  const removePartner = async () => {
    const id = _get(currentRow, "id");
    if (!id) return;
    await paymentService.removeAddPartners([id]);
    await queryClient.refetchQueries({
      queryKey: [QUERY_KEYS.addPartnerTxQuery],
    });
    navigation.push("/dashboard/partner");
    toast({
      title: "Removed successfully",
    });
    setShowCancelModal(false);
  };

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
      const txHash = await approveTx({
        contractAddress,
        encodedTxData,
      });
      if (txHash.isError) {
        throw txHash.error
      }
      await paymentService.removeAddPartners([id])
      await refetch()
      toast({
        title: "Approved successfully",
        description: (
          <a rel="noreferrer" target="_blank" href={createTxExplorerLink("tomo", txHash.data)}>{txHash.data}</a>
        ),
      });
      setShowApproveModal(false);
    } catch (error) {
      LoggerProvider.log("Edit action error: ", error);
    }
  };

  const approveAllTransactions = async () => {
    try {
      const tomoChainData = CHAIN_DATA[CHAIN_TYPE.tomo];
      if (activeAddress?.chain !== CHAIN_TYPE.tomo) {
        onSwitchNetwork?.(tomoChainData.chainId);
        return;
      }
      const multiCallData = await paymentService.getAddItemsMultiCallData(
        tomoChainData.chain
      );

      const txHash = await approveTx({
        contractAddress: multiCallData?.address || "",
        encodedTxData: multiCallData?.data || "",
      });
      if (txHash.isError) {
        throw txHash.error
      }
      toast({
        title: "Approved successfully",
        description: (
          <a rel="noreferrer" target="_blank" href={createTxExplorerLink("tomo", txHash.data)}>{txHash.data}</a>
        ),
      });
      await refetch()
      paymentService.removeAddPartners([]);
      setShowApproveModal(false);
    } catch (error) {
      LoggerProvider.log(error);
    }
  };

  const onCloseModal = () => {
    setShowApproveModal(false);
    setShowCancelModal(false);
  };

  const modalData = isApproveAll ? data : currentRow ? [currentRow] : [];

  const approveCallback = isApproveAll
    ? approveAllTransactions
    : approveTransaction;

  return (
    <PartnerContext.Provider
      value={{
        setIsApproveAll,
        data,
        setCurrentRow,
      }}
    >
      <ApproveModal
        title="Approve Transaction"
        description="Approve set admin transaction"
        onApprove={approveCallback}
        onClose={onCloseModal}
        onOpenChange={setShowApproveModal}
        data={modalData}
        open={showApproveModal}
      />
      <AlertModal
        onConfirm={removePartner}
        onCancel={onCloseModal}
        open={showCancelModal}
        title="Be careful"
        description="Remove this record ?"
      />
      {children}
    </PartnerContext.Provider>
  );
};

export default SetPartnerProvider;
