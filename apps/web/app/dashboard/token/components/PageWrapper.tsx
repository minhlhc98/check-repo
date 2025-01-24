import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import useAddItemsProvider from "../hooks/useAddItemsProvider";
import DataTableLayout from "@/components/TableDataLayout";
import AddItemsDataTable from "./AddItemsDataTable";
import { useDashboardContext } from "../../components/DashboardProvider";

const PageWrapper = () => {
  const { push } = useRouter();
  const { setIsApproveAll } = useAddItemsProvider();
  const { setKeyword, setShowApproveModal } = useDashboardContext()
  const { data } = useAddItemsProvider();
  const onRoute = () => {
    push("/dashboard/actions/add-token");
  };

  const onApproveAll = () => {
    setIsApproveAll(true);
    setShowApproveModal(true);
  };

  return (
    <DataTableLayout
      inputConfig={{
        onChange: setKeyword,
      }}
      toolbarRightView={
        <div className="flex">
          <Button
            onClick={onApproveAll}
            disabled={data.length === 0}
            className="mr-2"
          >
            Approve All
          </Button>
          <Button onClick={onRoute}>Add Items</Button>
        </div>
      }
    >
      <AddItemsDataTable />
    </DataTableLayout>
  );
};

export default PageWrapper;
