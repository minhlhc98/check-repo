import { useMemo } from "react";
import {
  PaymentAdmin,
  Enviroment,
} from "@coin98/payment_admin";

export const usePaymentAdmin = () => {
  const paymentService = useMemo(() => {
    return new PaymentAdmin({
      enviroment:
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        process.env.NODE_ENV !== Enviroment.production
          ? Enviroment.development
          : Enviroment.production,
    });
  }, []);

  return {
    paymentService,
  };
};
