import {
  AddItemParams,
  AddItemResponse,
  PaymentAdmin,
  SetAdminParams,
  SetAdminReponse,
  SetOracleTokensParams,
  SetOracleTokensReponse,
  SetPartnerParams,
  SetPartnerResponse,
  Enviroment,
  IsAdminParams,
  AggregateParams,
  chainKey,
} from "@coin98/payment_admin";
import { getDataFromStorage } from "./DataFeeder";
import { COLLECTION_NAME } from "@/storage-provider/constants";
import { IMulticallData, IQueueTransactionInfo } from "../types";
import { v4 } from "uuid";
import _get from "lodash-es/get";

export class PaymentService {
  static PaymentServiceError = "Payment service is not available";
  private _paymentAdmin: PaymentAdmin;
  constructor(environment: Enviroment = Enviroment.development) {
    this._paymentAdmin = new PaymentAdmin({ enviroment: environment });
  }

  getMulticallData = async (params: AggregateParams) => {
    const data = await this._paymentAdmin.aggregate(params);
    return data;
  };

  getSetPartnerMultiCallData = async (chain: chainKey) => {
    const setAdminsCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetPartnerResponse>[]>(
        "SET_PARTNER"
      );
    const multicallData = [] as IMulticallData;
    setAdminsCollection.map((item) => {
      if (item.data.transaction) {
        multicallData.push({
          address: _get(item, ["data", "transaction", "contractAddress"], ""),
          data: _get(item, ["data", "transaction", "data"], ""),
        });
      }
    });
    return await this.getMulticallData({
      chain: chain,
      params: multicallData,
    });
  };

  getSetTokensPriceMultiCallData = async (chain: chainKey) => {
    const setAdminsCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetOracleTokensReponse>[]>(
        "SET_TOKENS_PRICE"
      );
    const multicallData = [] as IMulticallData;
    setAdminsCollection.map((item) => {
      if (item.data.transaction) {
        multicallData.push({
          address: _get(item, ["data", "transaction", "contractAddress"], ""),
          data: _get(item, ["data", "transaction", "data"], ""),
        });
      }
    });
    return await this.getMulticallData({
      chain: chain,
      params: multicallData,
    });
  };

  getAddItemsMultiCallData = async (chain: chainKey) => {
    const addItemsCollection =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "ADD_ITEMS"
      );
    const multicallData = [] as IMulticallData;
    addItemsCollection.map((item) => {
      if (item.data.transaction) {
        multicallData.push({
          address: _get(item, ["data", "transaction", "contractAddress"], ""),
          data: _get(item, ["data", "transaction", "data"], ""),
        });
      }
    });
    return await this.getMulticallData({
      chain: chain,
      params: multicallData,
    });
  };

  removeSetAdmins = async (ids: Array<string>) => {
    if (Array.isArray(ids) && ids.length === 0) {
      localStorage.removeItem(COLLECTION_NAME.SET_ADMIN);
    }

    const setAdminsCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetAdminReponse>[]>(
        "SET_ADMIN"
      );

    const newSetAdminsCollection = setAdminsCollection.filter((item) =>
      ids.every((id) => id !== item.id)
    );
    localStorage.setItem(
      COLLECTION_NAME.SET_ADMIN,
      JSON.stringify(newSetAdminsCollection)
    );
  };

  // Pass empty array to remove all items
  removeAddItems = async (ids: Array<string>) => {
    const addTokenCollection =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "ADD_ITEMS"
      );
    const newAddTokenCollection = addTokenCollection.filter((item) =>
      ids.every((id) => id !== item.id)
    );
    localStorage.setItem(
      COLLECTION_NAME.ADD_ITEMS,
      JSON.stringify(newAddTokenCollection)
    );
  };

  // Pass empty array to remove all items
  removeAddPartners = async (ids: Array<string>) => {
    const addPartnerCollection =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "SET_PARTNER"
      );
    const newAddPartnerCollection = addPartnerCollection.filter((item) =>
      ids.every((id) => id !== item.id)
    );
    localStorage.setItem(
      COLLECTION_NAME.SET_PARTNER,
      JSON.stringify(newAddPartnerCollection)
    );
  };

  // Pass empty array to remove all items
  removeSetTokensPrice = async (ids: Array<string>) => {
    const setTokenPriceCollection =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "SET_TOKENS_PRICE"
      );
    const newSetTokenPriceCollection = setTokenPriceCollection.filter((item) =>
      ids.every((id) => id !== item.id)
    );
    localStorage.setItem(
      COLLECTION_NAME.SET_TOKENS_PRICE,
      JSON.stringify(newSetTokenPriceCollection)
    );
  };

  setAdmins = async (params: SetAdminParams) => {
    if (!this._paymentAdmin) {
      throw new Error(PaymentService.PaymentServiceError);
    }

    const response = await this._paymentAdmin.setAdmins(params);
    const recordData: IQueueTransactionInfo<SetAdminReponse> = {
      id: v4(),
      data: response,
      timestamp: Date.now(),
      type: "SET_ADMIN",
    };
    const setAdminsCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetAdminReponse>[]>(
        "SET_ADMIN"
      );
    setAdminsCollection.push(recordData);
    localStorage.setItem(
      COLLECTION_NAME.SET_ADMIN,
      JSON.stringify(setAdminsCollection)
    );
  };

  addItems = async (params: AddItemParams) => {
    if (!this._paymentAdmin) {
      throw new Error(PaymentService.PaymentServiceError);
    }
    const response = await this._paymentAdmin.addItems(params);
    const recordData: IQueueTransactionInfo<AddItemResponse> = {
      id: v4(),
      data: response,
      timestamp: Date.now(),
      type: "ADD_TOKEN",
    };
    const addTokenCollection =
      await getDataFromStorage<IQueueTransactionInfo<AddItemResponse>[]>(
        "ADD_ITEMS"
      );
    addTokenCollection.push(recordData);
    localStorage.setItem(
      COLLECTION_NAME.ADD_ITEMS,
      JSON.stringify(addTokenCollection)
    );
  };

  addPartner = async (params: SetPartnerParams) => {
    if (!this._paymentAdmin) {
      throw new Error(PaymentService.PaymentServiceError);
    }
    const response = await this._paymentAdmin.setPartner(params);
    const recordData: IQueueTransactionInfo<SetPartnerResponse> = {
      id: v4(),
      timestamp: Date.now(),
      type: "SET_PARTNER",
      data: response,
    };
    const setPartnerCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetPartnerResponse>[]>(
        "SET_PARTNER"
      );
    setPartnerCollection.push(recordData);
    localStorage.setItem(
      COLLECTION_NAME.SET_PARTNER,
      JSON.stringify(setPartnerCollection)
    );
  };

  isAdmin = async (params: IsAdminParams) => {
    if (!this._paymentAdmin) {
      throw new Error(PaymentService.PaymentServiceError);
    }
    const isAdmin = await this._paymentAdmin.isAdmins({
      address: params.address,
      chain: params.chain,
    });
    return isAdmin;
  };

  setTokensPrice = async (params: SetOracleTokensParams) => {
    if (!this._paymentAdmin) {
      throw new Error(PaymentService.PaymentServiceError);
    }
    const response = await this._paymentAdmin.setOracleTokens(params);
    const recordData: IQueueTransactionInfo<SetOracleTokensReponse> = {
      id: v4(),
      data: response,
      timestamp: Date.now(),
      type: "SET_TOKENS_PRICE",
    };
    const setTokenPriceCollection =
      await getDataFromStorage<IQueueTransactionInfo<SetOracleTokensReponse>[]>(
        "SET_TOKENS_PRICE"
      );
    setTokenPriceCollection.push(recordData);
    localStorage.setItem(
      COLLECTION_NAME.SET_TOKENS_PRICE,
      JSON.stringify(setTokenPriceCollection)
    );
  };
}
