"use client";

import { formatAddress } from "@/common/functions";
import { columnsGenerator } from "@/components/table";
import { SetOracleTokensReponse } from "@coin98/payment_admin";
import { Row } from "@tanstack/react-table";
import _get from "lodash-es/get";
import _first from "lodash-es/first";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { IQueueTransactionInfo } from "../../../types";
import dayjs from "dayjs";
import { RowCell } from "../RowCell";

const onCopy = async (txData: string) => {
  await navigator.clipboard.writeText(txData);
  toast(<div>Copied transaction data successfully</div>);
};

const getData = (rowData: Row<IQueueTransactionInfo<SetOracleTokensReponse>>) =>
  _get(rowData, ["original", "data", "data"], []);

export const SET_TOKENS_PRICE_COLUMNS = columnsGenerator<
  IQueueTransactionInfo<SetOracleTokensReponse>
>([
  {
    accessorKey: "tokenAddress",
    header: "Token Address",
    cell: ({ row }) => {
      const data = getData(row);
      const address = _get(_first(data), ["tokenAddress"], "");
      return (
        <div className="max-w-[400px] truncate flex gap-x-2 items-center">
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
    accessorKey: "oracleAddress",
    header: "Oracle Address",
    cell: ({ row }) => {
      const data = getData(row);
      const address = _get(_first(data), ["oracleAddress"], "");
      return (
        <div className="max-w-[400px] truncate flex gap-x-2 items-center">
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
    id: "actions",
    header: "Actions",
    cell: RowCell,
  },
]);
