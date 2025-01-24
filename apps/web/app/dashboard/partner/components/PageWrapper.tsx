import { useRouter } from "next/navigation";
import usePartnerProvider from "../hooks/usePartnerProvider";
import DataTableLayout from "@/components/TableDataLayout";
import SetPartnerDataTable from "./PartnerDataTable";
import { useDashboardContext } from "../../components/DashboardProvider";
import Button from "@/components/Button";

const PageWrapper = () => {
  const { push } = useRouter();
  const { setShowApproveModal, setKeyword } = useDashboardContext();
  const { data, setIsApproveAll } = usePartnerProvider();

  const onRoute = () => {
    push("/dashboard/actions/set-partner");
  };

  const onApproveAll = () => {
    setIsApproveAll(true);
    setShowApproveModal(true);
  };

  return (
    <DataTableLayout
      inputConfig={{
        onChange: setKeyword,
        placeholder: "Search partner code, address, ...",
      }}
      toolbarRightView={
        <div className="flex">
          <Button
            disabled={data.length === 0}
            className="mr-2"
            onClick={onApproveAll}
          >
            Approve All
          </Button>
          <Button onClick={onRoute}>Set Partner</Button>
        </div>
      }
    >
      <SetPartnerDataTable />
    </DataTableLayout>
  );
};

export default PageWrapper;
