import { QUERY_KEYS } from "@/common/constants";
import { AddItemResponse } from "@coin98/payment_admin";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage } from "../../service/DataFeeder";
import { IQueueTransactionInfo } from "../../types";

const useAddItemsQuery = () => {
  const queryFn = async () => {
    const responseData =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "ADD_ITEMS"
      );
    return responseData;
  };
  const { data = [], isLoading, isFetching, refetch } = useQuery<
    IQueueTransactionInfo<AddItemResponse>[]
  >({
    queryKey: [QUERY_KEYS.addTokenTxQuery],
    queryFn: queryFn,
  });

  return { data, isLoading, isFetching, refetch };
};

export default useAddItemsQuery;
