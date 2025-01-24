import { IBaseApproveModalProps, IQueueTransactionInfo } from "../../types";
import { AddItemResponse } from "@coin98/payment_admin";
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
}: IBaseApproveModalProps<IQueueTransactionInfo<AddItemResponse>[]>) {
  const renderData = () => {
    return (
      <div className="flex flex-col overflow-hidden gap-y-2">
        {data.map((item) => {
          const itemDataArr = _get(item, ["data", "data"]);
          return itemDataArr.map((itemData, index) => {
            return (
              <div
                key={itemData.itemKey + index}
                className="border border-slate-400 rounded-md p-4 overflow-auto"
              >
                <div className="flex justify-between">
                  <div>Item key:</div>
                  <div>{_get(itemData, "itemKey", "")}</div>
                </div>
                <div className="flex justify-between">
                  <div>Partner code:</div>
                  <div>{_get(itemData, ["itemInfo", "partnerCode"], "")}</div>
                </div>
                <div className="flex justify-between">
                  <div>Active:</div>
                  <div>
                    {_get(itemData, ["itemInfo", "isActive"])
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Token address:</div>
                  <div>
                    {formatAddress(
                      _get(itemData, ["itemInfo", "tokenAddress"], "")
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Price in usd:</div>
                  <div>{_get(itemData, ["itemInfo", "priceInUsd"], "0")}</div>
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
      onOpenChange={onOpenChange}
      open={open}
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

export default ApproveModal;
