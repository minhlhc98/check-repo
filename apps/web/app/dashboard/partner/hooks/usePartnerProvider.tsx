import { useContext } from "react";
import {PartnerContext} from "../provider/PartnerProvider";

const usePartnerProvider = () => {
    const context = useContext(PartnerContext)
    if (!context) {
        throw new Error('usePartnerProvider is only available within SetPartnerProvider')
    }
    return context
}

export default usePartnerProvider;