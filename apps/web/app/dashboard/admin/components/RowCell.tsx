import { CellContext } from "@tanstack/react-table";
import useAdminProvider from "../hooks/useAdminProvider";
import _get from "lodash-es/get";
import { IQueueTransactionInfo } from "../../types";
import { SetAdminReponse } from "@coin98/payment_admin";
import RowActions from "../../components/RowActions";
import { useDashboardContext } from "../../components/DashboardProvider";

export const RowCell = ({
  row,
}: CellContext<IQueueTransactionInfo<SetAdminReponse>, unknown>) => {
  const { setCurrentRow } = useAdminProvider();
  const { setShowApproveModal, setShowCancelModal } = useDashboardContext();
  const onApprove = () => {
    setCurrentRow(_get(row, ["original"])!);
    setShowApproveModal(true);
  };

  const onCancel = () => {
    setCurrentRow(_get(row, ["original"])!);
    setShowCancelModal(true);
  };
  return <RowActions onApprove={onApprove} onCancel={onCancel} />;
};
