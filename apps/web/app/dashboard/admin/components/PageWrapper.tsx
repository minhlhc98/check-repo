import { useRouter } from "next/navigation";
import { useDashboardContext } from "../../components/DashboardProvider";
import DataTableLayout from "@/components/TableDataLayout";
import AdminDataTable from "./AdminDataTable";
import { Button } from "@workspace/ui/components/button";

const PageWrapper = () => {
  const { push } = useRouter();
  const { setKeyword } = useDashboardContext();
  const onRoute = () => {
    push("/dashboard/actions/set-admin");
  };

  return (
    <DataTableLayout
      inputConfig={{
        onChange: setKeyword,
        placeholder: 'Search admin address...'
      }}
      toolbarRightView={<Button onClick={onRoute}>Set Admin</Button>}
    >
      <AdminDataTable />
    </DataTableLayout>
  );
};

export default PageWrapper;
