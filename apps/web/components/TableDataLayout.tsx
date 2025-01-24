import { Input } from "@workspace/ui/components/input";
import { ChangeEvent, PropsWithChildren } from "react";

export interface IDataTableLayout extends PropsWithChildren {
  inputConfig: {
    placeholder?: string;
    onChange: (value: string) => void;
  };
  toolbarRightView?: React.ReactNode;
}

const DataTableLayout = ({
  inputConfig,
  toolbarRightView,
  children,
}: IDataTableLayout) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputConfig.onChange(e.target?.value);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between gap-x-2">
        <Input
          onChange={onChange}
          placeholder={inputConfig.placeholder ?? "Search items..."}
          className="w-full mr-4 lg:w-56 lg:mr-0"
        />
        {toolbarRightView}
      </div>
      {children}
    </div>
  );
};

export default DataTableLayout;
