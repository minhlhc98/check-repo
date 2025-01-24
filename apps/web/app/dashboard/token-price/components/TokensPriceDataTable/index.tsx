import { DataTable } from "@/components/table";
import { SET_TOKENS_PRICE_COLUMNS } from "./SetTokensPriceColumns";
import useSetTokensPriceProvider from "../../hooks/useTokensPriceProvider";

const TokenPriceTable = () => {
  const { data } = useSetTokensPriceProvider();
  return (
    <div className="rounded-md border">
      <DataTable data={data} columns={SET_TOKENS_PRICE_COLUMNS} />
    </div>
  );
};

export default TokenPriceTable;
