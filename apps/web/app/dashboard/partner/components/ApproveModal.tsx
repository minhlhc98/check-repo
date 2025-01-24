import { IBaseApproveModalProps, IQueueTransactionInfo } from "../../types";
import { SetPartnerResponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import { Modal } from "@/components/Modal";

function ApproveModal({
  data,
  open,
  onClose,
  onApprove,
  onOpenChange,
  title,
  description,
}: IBaseApproveModalProps<IQueueTransactionInfo<SetPartnerResponse>[]>) {

  const renderData = () => {
    return (
      <div className="flex flex-col overflow-hidden gap-y-2">
        {data.map((item) => {
          const partnerData = _get(item, ["data", "data"]);
          return (
            <div
              key={item.id}
              className="border border-slate-400 rounded-md p-4 overflow-auto"
            >
              <div className="flex justify-between">
                <div>Partner code:</div>
                <div>{_get(partnerData, "partnerCode")}</div>
              </div>
              <div className="flex justify-between">
                <div>Active:</div>
                <div>
                  {_get(partnerData, ["partnerInfo", "isActive"])
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal
    open={open}
    onOk={{
      callback: onApprove
    }}
    onCancel={{
      callback: onClose
    }}
    onOpenChange={onOpenChange}
    description={description}
    title={title}>
      {renderData()}
    </Modal>
  );
}

export default ApproveModal;
