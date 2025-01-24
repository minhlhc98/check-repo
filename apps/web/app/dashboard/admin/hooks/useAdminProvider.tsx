import { useContext } from "react";
import { SetAdminContext } from "../provider/AdminProvider";

const useSetAdminProvider = () => {
    const context = useContext(SetAdminContext)
    if (!context) {
        throw new Error('useSetAdminProvider is only available within SetAdminProvider')
    }
    return context
}

export default useSetAdminProvider;