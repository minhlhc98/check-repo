import { DataTable } from "@/components/table";
import { SET_PARTNER_COLUMNS } from "./PartnerColumns";
import usePartnerProvider from "../../hooks/usePartnerProvider";

const SetPartnerDataTable = () => {
  const { data = [] } = usePartnerProvider();
  return (
    <div className="rounded-md border">
      <DataTable data={data} columns={SET_PARTNER_COLUMNS} />
    </div>
  );
};

export default SetPartnerDataTable;
