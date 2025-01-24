"use client";

import { formatAddress } from "@/common/functions";
import { columnsGenerator } from "@/components/table";
import { AddItemResponse } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import _first from "lodash-es/first";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { IQueueTransactionInfo } from "@/app/dashboard/types";
import RowActions from "@/app/dashboard/components/RowActions";
import dayjs from "dayjs";
import { RowCell } from "../RowCell";

const onCopy = async (txData: string) => {
  await navigator.clipboard.writeText(txData);
  toast(<div>Copied transaction data successfully</div>);
};

const getData = (rowData: Row<IQueueTransactionInfo<AddItemResponse>>) =>
  _get(rowData, ["original", "data", "data"], []);

export const ADD_TOKEN_COLUMNS = columnsGenerator<
  IQueueTransactionInfo<AddItemResponse>
>([
  {
    accessorKey: "partnerCode",
    header: "Partner Code",
    cell: ({ row }) => {
      const data = getData(row);
      const partnerCode = _get(_first(data), ["itemInfo", "partnerCode"], "");
      return (
        <div className="max-w-[200px] truncate flex gap-x-2 items-center">
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
    accessorKey: "tokenAddress",
    header: "Token Address",
    cell: ({ row }) => {
      const data = getData(row);
      const tokenAddress = _get(_first(data), ["itemInfo", "tokenAddress"], "");
      return (
        <div className="flex gap-x-2 items-center">
          {tokenAddress ? formatAddress(tokenAddress) : ""}
          <CopyIcon
            onClick={() => onCopy(tokenAddress)}
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
      const rowData = getData(row);
      const isActive = _get(_first(rowData), ["itemInfo", "isActive"]);
      return <div>{isActive ? "Active" : "Deactive"}</div>;
    },
  },
  {
    accessorKey: "priceInToken",
    header: "Price in Token",
    cell: ({ row }) => {
      const data = getData(row);
      const priceInToken = _get(data, ["itemInfo", "priceInToken"], "0");
      return <div className="max-w-[200px] truncate">{priceInToken}</div>;
    },
  },
  {
    accessorKey: "priceInUSD",
    header: "Price in USD",
    cell: ({ row }) => {
      const data = getData(row);
      const priceInUSD = _get(data, ["itemInfo", "priceInUSD"], "0");
      return <div className="max-w-[200px] truncate">{priceInUSD}</div>;
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
  //         <div className="max-w-[150px] truncate">{transactionData}</div>
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
  //       <div className="max-w-[200px] truncate flex items-center gap-x-2">
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
    cell: RowCell
  },
]);
