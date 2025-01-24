import { AdminWalletContext } from "../providers/AdminWalletProvider";
import { useContext } from "react";

export const useAdminWalletContext = () => {
    const context = useContext(AdminWalletContext);
    if (!context) {
      throw new Error(
        'useAdminWalletContext is only available within AdminWalletProvider'
      );
    }
    return context;
  };
  