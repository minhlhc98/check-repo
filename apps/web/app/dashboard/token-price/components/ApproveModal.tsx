import { IBaseApproveModalProps, IQueueTransactionInfo } from "../../types";
import { SetOracleTokensReponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import { formatAddress } from "@/common/functions";
import { Modal } from "@/components/Modal";

export function ApproveModal({
  data,
  open,
  onClose,
  onApprove,
  onOpenChange,
  title,
  description,
}: IBaseApproveModalProps<IQueueTransactionInfo<SetOracleTokensReponse>[]>) {
  const renderData = () => {
    return (
      <div className="flex flex-col overflow-hidden gap-y-2">
        {data.map((item) => {
          const tokenDataList = _get(item, ["data", "data"]);
          return tokenDataList.map((tokenData) => {
            return (
              <div
                key={item.id}
                className="border border-slate-400 rounded-md p-4 overflow-auto"
              >
                <div className="flex justify-between">
                  <div>Token address:</div>
                  <div>
                    {formatAddress(_get(tokenData, "tokenAddress", ""))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Oracle address:</div>
                  <div>
                    {formatAddress(_get(tokenData, "oracleAddress", ""))}
                  </div>
                </div>
              </div>
            );
          });
        })}
      </div>
    );
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      description={description}
      onCancel={{
        callback: onClose,
      }}
      onOk={{
        callback: onApprove,
      }}
    >
      {renderData()}
    </Modal>
  );
}
