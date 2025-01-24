import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import _get from "lodash-es/get";

interface ITabConfig {
  tabValue: string;
  title: string;
}

interface ITabContent {
  tabValue: string;
  content: React.ReactNode | string;
}

interface ITabsTitleProps {
  tabsConfig: Array<ITabConfig>;
  defaultValue?: string;
  onChange: (newValue: string) => MouseEventHandler<HTMLDivElement> | undefined;
}

interface ITabsProps {
  defaultValue?: string;
  tabsTitle: Array<ITabConfig>;
  tabsContent: Array<ITabContent>;
}

const TabTitle = ({ tabsConfig, defaultValue, onChange }: ITabsTitleProps) => {
  return (
    <div className="flex gap-x-4">
      {tabsConfig.map((item, index) => {
        const isActive = item.tabValue === defaultValue;
        return (
          <div
            role="button"
            onClick={onChange(item.tabValue)}
            className={cn("text-lg", {
              "text-gray-400": !isActive,
            })}
            key={item.tabValue + index}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export const Tabs = ({ tabsTitle, tabsContent, defaultValue }: ITabsProps) => {
  const [activeTabValue, setActiveTabValue] = useState(
    defaultValue || tabsTitle[0]?.tabValue
  );

  const activeTabContent = useMemo(() => {
    const tabContentItem = tabsContent.find(
      (item) => item.tabValue === activeTabValue
    );
    return _get(tabContentItem, "content", "");
  }, [activeTabValue]);

  const onTabChange = useCallback(
    (newValue: string) => () => {
      setActiveTabValue(newValue);
    },
    []
  );

  return (
    <div className="w-full gap-y-2 flex flex-col">
      <TabTitle
        onChange={onTabChange}
        defaultValue={activeTabValue}
        tabsConfig={tabsTitle}
      />
      {activeTabContent}
    </div>
  );
};
