"use client";

import { QUERY_KEYS } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage } from "../../service/DataFeeder";
import { IQueueTransactionInfo } from "../../types";
import { SetPartnerResponse } from "@coin98/payment_admin";

const useSetPartnerQuery = () => {
  const queryFn = async () => {
    const responseData =
      await getDataFromStorage<IQueueTransactionInfo<SetPartnerResponse>[]>(
        "SET_PARTNER"
      );
    return responseData;
  };
  const { data = [], isLoading, isFetching, refetch } = useQuery<
    IQueueTransactionInfo<SetPartnerResponse>[]
  >({
    queryKey: [QUERY_KEYS.addPartnerTxQuery],
    queryFn: queryFn,
  });

  return { data, isLoading, isFetching, refetch };
};

export default useSetPartnerQuery;
