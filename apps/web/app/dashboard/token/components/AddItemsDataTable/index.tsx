import { DataTable } from "@/components/table";
import { ADD_TOKEN_COLUMNS } from "./AddItemsColumns";
import useAddTokenProvider from "../../hooks/useAddItemsProvider";

const AddItemsDataTable = () => {
  const { data = [] } = useAddTokenProvider()
  return (
    <div className="rounded-md border">
      <DataTable data={data} columns={ADD_TOKEN_COLUMNS} />
    </div>
  );
};

export default AddItemsDataTable;
