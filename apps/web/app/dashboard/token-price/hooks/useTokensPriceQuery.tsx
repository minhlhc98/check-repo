"use client";

import { QUERY_KEYS } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage } from "../../service/DataFeeder";
import { SetOracleTokensReponse } from "@coin98/payment_admin";
import { IQueueTransactionInfo } from "../../types";

const useSetTokensPriceQuery = () => {
  const queryFn = async () => {
    return await getDataFromStorage<
      IQueueTransactionInfo<SetOracleTokensReponse>[]
    >("SET_TOKENS_PRICE");
  };

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IQueueTransactionInfo<SetOracleTokensReponse>[]>({
    queryKey: [QUERY_KEYS.setTokenPriceTxQuery],
    queryFn: queryFn,
  });

  return { data, isLoading, isFetching, refetch };
};

export default useSetTokensPriceQuery;
