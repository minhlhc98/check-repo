"use client";

import { formatAddress } from "@/common/functions";
import { columnsGenerator } from "@/components/table";
import { SetPartnerResponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { IQueueTransactionInfo } from "@/app/dashboard/types";
import dayjs from "dayjs";
import { RowCell } from "../RowCell";

const onCopy = async (txData: string) => {
  await navigator.clipboard.writeText(txData);
  toast(<div>Copied transaction data successfully</div>);
};

export const SET_PARTNER_COLUMNS = columnsGenerator<
  IQueueTransactionInfo<SetPartnerResponse>
>([
  {
    accessorKey: "partnerCode",
    header: "Partner Code",
    cell: ({ row }) => {
      const partnerCode = _get(
        row,
        ["original", "data", "data", "partnerCode"],
        ""
      );
      return (
        <div className="max-w-[400px] truncate flex gap-x-2 items-center">
          {partnerCode}
          <CopyIcon
            onClick={() => onCopy(partnerCode)}
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = _get(
        row,
        ["original", "data", "data", "partnerInfo", "owner"],
        ""
      );
      return (
        <div className="flex gap-x-2 items-center">
          {owner ? formatAddress(owner) : ""}
          <CopyIcon
            onClick={() => onCopy(owner)}
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "feeReceiver",
    header: "Fee Receiver",
    cell: ({ row }) => {
      const feeReceiver = _get(
        row,
        ["original", "data", "data", "partnerInfo", "feeReceiver"],
        ""
      );
      return (
        <div className="flex gap-x-2 items-center">
          {feeReceiver ? formatAddress(feeReceiver) : ""}
          <CopyIcon
            onClick={() => onCopy(feeReceiver)}
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
      const isActive = _get(
        row,
        ["original", "data", "data", "partnerInfo", "isActive"],
        ""
      );
      return <div>{isActive ? "Active" : "Deactive"}</div>;
    },
  },
  {
    accessorKey: "protocolFee",
    header: "Protocal Fee",
    cell: ({ row }) => {
      const protocalFee = _get(
        row,
        ["original", "data", "data", "partnerInfo", "protocolFee"],
        "0"
      );
      return <div className="max-w-[200px] truncate">{protocalFee}</div>;
    },
  },
  {
    accessorKey: "commissionFee",
    header: "Commission Fee",
    cell: ({ row }) => {
      const comissionFee = _get(
        row,
        ["original", "data", "data", "partnerInfo", "commissionFee"],
        "0"
      );
      return <div className="max-w-[200px] truncate">{comissionFee}</div>;
    },
  },
  // {
  //   accessorKey: "transaction data",
  //   header: "Transaction Data",
  //   cell: ({ row }) => {
  //     const transactionData = _get(
  //       row,
  //       ["original", "data", "transaction", "data"],
  //       ""
  //     );
  //     return (
  //       <div className="flex gap-x-2 items-center">
  //         <div className="w-[100px] truncate">{transactionData}</div>
  //         <CopyIcon
  //           onClick={() => onCopy(transactionData)}
  //           className="cursor-pointer"
  //           width={16}
  //           height={16}
  //         />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "contractAddress",
  //   header: "Contract Address",
  //   cell: ({ row }) => {
  //     const contractAddress = _get(
  //       row,
  //       ["original", "data", "transaction", "contractAddress"],
  //       ""
  //     );
  //     return (
  //       <div className="truncate flex gap-x-2 items-center">
  //         {contractAddress ? formatAddress(contractAddress) : ""}
  //         <CopyIcon
  //           onClick={() => onCopy(contractAddress)}
  //           className="cursor-pointer"
  //           width={16}
  //           height={16}
  //         />
  //       </div>
  //     );
  //   },
  // },
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
    accessorKey: "actions",
    header: "Actions",
    cell: RowCell,
  },
]);
