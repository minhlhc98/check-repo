import { useContext } from "react";
import { AddItemsContext } from "../provider/AddItemsProvider";

const useAddItemsProvider = () => {
    const context = useContext(AddItemsContext)
    if (!context) {
        throw new Error('useAddItemsProvider is only available within SetAdminProvider')
    }
    return context
}

export default useAddItemsProvider;