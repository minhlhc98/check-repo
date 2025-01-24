import { CellContext } from "@tanstack/react-table";
import useSetPartnerProvider from "../hooks/usePartnerProvider";
import _get from "lodash-es/get";
import { IQueueTransactionInfo } from "../../types";
import { SetPartnerResponse } from "@coin98/payment_admin";
import RowActions from "../../components/RowActions";
import { useDashboardContext } from "../../components/DashboardProvider";

export const RowCell = ({
  row,
}: CellContext<IQueueTransactionInfo<SetPartnerResponse>, unknown>) => {
  const { setCurrentRow, setIsApproveAll } = useSetPartnerProvider();
  const { setShowApproveModal, setShowCancelModal } = useDashboardContext()
  const onApprove = () => {
    setIsApproveAll(false);
    setCurrentRow(_get(row, ["original"])!);
    setShowApproveModal(true);
  };

  const onCancel = () => {
    setCurrentRow(_get(row, ["original"])!);
    setShowCancelModal(true)
  };
  return <RowActions onApprove={onApprove} onCancel={onCancel} />;
};
