import React, { PropsWithChildren, useMemo, useRef, useState } from "react";
import useSetAdminQuery from "../hooks/useAdminQuery";
import { IDataTableProvider, IQueueTransactionInfo } from "../../types";
import { chainKey, SetAdminReponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import ApproveModal from "../components/ApproveModal";
import { LoggerProvider } from "@/logger";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { PaymentService } from "../../service/PaymentService";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/AlertModal";
import { useDashboardContext } from "../../components/DashboardProvider";
import _first from "lodash-es/first";
import { createTxExplorerLink } from "@/common/functions";
import { useAppContext } from "@/providers/AppProvider";

export const SetAdminContext = React.createContext(
  {} as IDataTableProvider<IQueueTransactionInfo<SetAdminReponse>>
);

const SetAdminProvider = ({ children }: PropsWithChildren) => {
  const {
    setShowApproveModal,
    setShowCancelModal,
    keyword,
    showApproveModal,
    showCancelModal,
    approveTx,
  } = useDashboardContext();
  const [currentRow, setCurrentRow] =
    useState<IQueueTransactionInfo<SetAdminReponse> | null>();
  const { data: adminData = [], refetch } = useSetAdminQuery();
  const { toast } = useToast();
  const paymentService = useRef(new PaymentService()).current;
  const navigation = useRouter();
  const { activeAddress } = useAppContext();

  const data = useMemo(() => {
    try {
      if (!keyword) return adminData;
      const filteredData = adminData.filter(
        (item: IQueueTransactionInfo<SetAdminReponse>) => {
          const txData = _first(_get(item, ["data", "data"], []));
          const adminAddress = _get(txData, "address", "");
          return adminAddress.toLowerCase().includes(keyword.toLowerCase());
        }
      );
      return filteredData;
    } catch (error) {
      LoggerProvider.log(error);
      return [] as IQueueTransactionInfo<SetAdminReponse>[];
    }
  }, [adminData, keyword]);

  const removeAdmin = async () => {
    const id = _get(currentRow, "id", "");
    if (!id) return;
    await paymentService.removeSetAdmins([id]);
    await refetch();
    navigation.push("/dashboard/admin");
    toast({
      title: "Removed successfully",
    });
    setShowCancelModal(false);
  };

  const approveTransaction = async () => {
    try {
      const id = _get(currentRow, "id", "");
      const contractAddress = _get(currentRow, [
        "data",
        "transaction",
        "contractAddress",
      ])!;
      const encodedTxData = _get(currentRow, ["data", "transaction", "data"])!;
      const txHash = await approveTx({
        contractAddress,
        encodedTxData,
      });
      if (txHash.isError) {
        throw txHash.error
      }
      toast({
        title: "Tx successfully",
        description: (
          <a
            href={createTxExplorerLink(
              activeAddress?.chain as unknown as chainKey,
              txHash.data
            )}
          >
            {txHash.data}
          </a>
        ),
      });
      await paymentService.removeSetAdmins([id]);
    } catch (error) {
      LoggerProvider.log("Edit action error: " + error);
      toast({
        title: "Tx failed",
        variant: "destructive",
      });
    } finally {
      setShowApproveModal(false);
    }
  };

  return (
    <SetAdminContext.Provider
      value={{
        data,
        setCurrentRow,
      }}
    >
      <ApproveModal
        title="Approve Transaction"
        description="Approve set admin transaction"
        onApprove={approveTransaction}
        onClose={() => setShowApproveModal(false)}
        onOpenChange={setShowApproveModal}
        data={[currentRow!]}
        open={showApproveModal}
      />
      <AlertModal
        open={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        onConfirm={removeAdmin}
        description="Delete this record?"
        title="Be cafeful"
      />
      {children}
    </SetAdminContext.Provider>
  );
};

export default SetAdminProvider;
