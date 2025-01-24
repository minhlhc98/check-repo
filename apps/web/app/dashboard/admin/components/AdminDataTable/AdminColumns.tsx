"use client";

import { formatAddress } from "@/common/functions";
import { columnsGenerator } from "@/components/table";
import { SetAdminReponse } from "@coin98/payment_admin";
import { Row } from "@tanstack/react-table";
import _get from "lodash-es/get";
import _first from "lodash-es/first";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { IQueueTransactionInfo } from "@/app/dashboard/types";
import dayjs from "dayjs";
import { RowCell } from "../RowCell";

const onCopy = async (txData: string) => {
  await navigator.clipboard.writeText(txData);
  toast(<div>Copied transaction data successfully</div>);
};

const getRowData = (rowData: Row<IQueueTransactionInfo<SetAdminReponse>>) =>
  _get(rowData, ["original", "data", "data"], []);

export const SET_ADMIN_COLUMNS = columnsGenerator<
  IQueueTransactionInfo<SetAdminReponse>
>([
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const data = getRowData(row);
      const address = _get(_first(data), ["address"], "");
      return (
        <div className="max-w-[200px] truncate flex gap-x-2 items-center">
          {address ? formatAddress(address) : ""}
          <CopyIcon
            onClick={() => onCopy(address)}
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const data = getRowData(row);
      const isActive = _get(data, ["isActive"], "");
      return <div>{isActive ? "Active" : "Deactive"}</div>;
    },
  },
  {
    accessorKey: "transaction data",
    header: "Transaction Data",
    cell: ({ row }) => {
      const transactionData = _get(
        row,
        ["original", "data", "transaction", "data"],
        ""
      );
      return (
        <div className="flex gap-x-2 items-center">
          <div className="max-w-[150px] truncate">{transactionData}</div>
          <CopyIcon
            onClick={() => onCopy(transactionData)}
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "contractAddress",
    header: "Contract Address",
    cell: ({ row }) => {
      const contractAddress = _get(
        row,
        ["original", "data", "transaction", "contractAddress"],
        ""
      );
      return (
        <div className="max-w-[200px] truncate flex items-center gap-x-2">
          {contractAddress ? formatAddress(contractAddress) : ""}
          <CopyIcon
            onClick={() => onCopy(contractAddress)}
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = _get(row, ["original", "timestamp"]);

      return timestamp
        ? dayjs(timestamp).format("hh:mm:ss DD/MM/YYYY")
        : undefined;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: RowCell,
  },
]);
