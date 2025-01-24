import { DataTable } from "@/components/table";
import { SET_ADMIN_COLUMNS } from "./AdminColumns";
import useAdminProvider from "../../hooks/useAdminProvider";

const SetAdminDataTable = () => {
  const { data = []} = useAdminProvider();
  return (
    <div className="rounded-md border">
      <DataTable
        data={data}
        columns={SET_ADMIN_COLUMNS}
      />
    </div>
  );
};

export default SetAdminDataTable;
