import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import useSetTokensPriceProvider from "../hooks/useTokensPriceProvider";
import DataTableLayout from "@/components/TableDataLayout";
import TokensPriceDataTable from "./TokensPriceDataTable";
import { useDashboardContext } from "../../components/DashboardProvider";

const PageWrapper = () => {
  const { push } = useRouter();
  const { setKeyword, setShowApproveModal } = useDashboardContext();
  const { data, setIsApproveAll } = useSetTokensPriceProvider();

  const onRoute = () => {
    push("/dashboard/actions/set-token-price");
  };

  const onApproveAll = () => {
    setIsApproveAll(true);
    setShowApproveModal(true);
  };

  return (
    <DataTableLayout
      inputConfig={{
        onChange: setKeyword,
        placeholder: "Search token address...",
      }}
      toolbarRightView={
        <div className="flex gap-x-2">
          <Button
            onClick={onApproveAll}
            disabled={data.length === 0}
            className="mr-2"
          >
            Approve All
          </Button>
          <Button onClick={onRoute}>Set Tokens Price</Button>
        </div>
      }
    >
      <TokensPriceDataTable />
    </DataTableLayout>
  );
};

export default PageWrapper;
