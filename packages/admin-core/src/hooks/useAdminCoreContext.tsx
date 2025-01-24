import { AdminCoreContext } from "../providers/MainProvider";
import { useContext } from "react";

export const useAdminCoreContext = () => {
    const context = useContext(AdminCoreContext);
    if (!context) {
      throw new Error(
        'useAdminCoreContext is only available within AdminCoreProvider'
      );
    }
    return context;
  };