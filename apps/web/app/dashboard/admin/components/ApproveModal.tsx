import { IBaseApproveModalProps, IQueueTransactionInfo } from "../../types";
import { SetAdminReponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import { formatAddress } from "@/common/functions";
import { Modal } from "@/components/Modal";

function ApproveModal({
  data,
  open,
  onClose,
  onApprove,
  onOpenChange,
  title,
  description,
}: IBaseApproveModalProps<IQueueTransactionInfo<SetAdminReponse>[]>) {
  const renderData = () => {
    return (
      <div className="flex flex-col overflow-hidden gap-y-2">
        {data.map((item) => {
          const adminData = _get(item, ["data", "data"], []);
          return adminData.map((item) => {
            return (
              <div
                key={item.address}
                className="border border-slate-400 rounded-md p-4 overflow-auto"
              >
                <div className="flex justify-between">
                  <div>Address:</div>
                  <div>{formatAddress(item.address)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Status:</div>
                  <div>{item.isActive ? "Active" : "Inactive"}</div>
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
      title={title}
      description={description}
      onOk={{
        title: "Approve",
        callback: onApprove,
      }}
      onCancel={{
        callback: onClose,
      }}
      open={open}
      onOpenChange={onOpenChange}
    >
      {renderData()}
    </Modal>
  );
}

export default ApproveModal;
