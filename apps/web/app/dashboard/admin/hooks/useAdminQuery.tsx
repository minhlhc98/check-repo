"use client";

import { QUERY_KEYS } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage } from "@/app/dashboard/service/DataFeeder";
import { SetAdminReponse } from "@coin98/payment_admin";
import { IQueueTransactionInfo } from "@/app/dashboard/types";

const useSetAdminQuery = () => {
  const getSetAdminData = async () => {
    return await getDataFromStorage<IQueueTransactionInfo<SetAdminReponse>[]>(
      "SET_ADMIN"
    );
  };

  const { data, isLoading, isFetching, refetch } = useQuery<
    IQueueTransactionInfo<SetAdminReponse>[]
  >({
    queryKey: [QUERY_KEYS.setAdminTxQuery],
    queryFn: getSetAdminData,
  });

  return { data, isLoading, isFetching, refetch };
};

export default useSetAdminQuery;
