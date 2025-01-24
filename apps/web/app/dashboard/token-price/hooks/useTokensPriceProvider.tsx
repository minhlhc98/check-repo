import { useContext } from "react";
import { SetTokensPriceContext } from "../provider/TokensPriceProvider";

const useTokensPriceProvider = () => {
    const context = useContext(SetTokensPriceContext)
    if (!context) {
        throw new Error('useTokensPriceProvider is only available within SetAdminProvider')
    }
    return context
}

export default useTokensPriceProvider;