import { CellContext } from "@tanstack/react-table";
import useSetTokensPriceProvider from "../hooks/useTokensPriceProvider";
import _get from "lodash-es/get";
import { IQueueTransactionInfo } from "../../types";
import { SetOracleTokensReponse } from "@coin98/payment_admin";
import RowActions from "../../components/RowActions";
import { useDashboardContext } from "../../components/DashboardProvider";

export const RowCell = ({
  row,
}: CellContext<IQueueTransactionInfo<SetOracleTokensReponse>, unknown>) => {
  const { setShowApproveModal } = useDashboardContext()
  const { setCurrentRow, setIsApproveAll } = useSetTokensPriceProvider();
  const onApprove = () => {
    setIsApproveAll(false)
    setCurrentRow(_get(row, ["original"])!);
    setShowApproveModal(true);
  };

  const onCancel = () => {
    setShowApproveModal(false)
  };
  return <RowActions onApprove={onApprove} onCancel={onCancel} />;
};
