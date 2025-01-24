"use client";

import Button from "@/components/Button";
import { usePaymentAdmin } from "@/hooks/usePaymentAdmin";
import {
  AddItemParams,
  AddItemResponse,
  ItemParams,
  SetAdminParams,
  SetAdminReponse,
  SetOracleTokensParams,
  SetPartnerParams,
} from "@coin98/payment_admin";
import { Input } from "@workspace/ui/components/input";
import { COLLECTION_NAME } from "@/storage-provider/constants";
import { convertBalanceToWei } from "@/common/utils/convertPrice";
import { getDataFromStorage } from "../dashboard/service/DataFeeder";

const TestSDK = () => {
  const { paymentService } = usePaymentAdmin();

  const setItem = async () => {
    const dataSample: AddItemParams = {
      chain: "tomo",
      params: [
        {
          itemInfo: {
            isActive: true,
            partnerCode: "son-goku-owner",
            tokenAddress: "0x288ac8e89aebCcd55A191C5E96775c676401e4f6",
            priceInToken: convertBalanceToWei("0.5").toString(), // raw -> amount * decimals -> 0
            priceInUsd: convertBalanceToWei("0").toString(), // raw -> dollar * 10^18 -> 0
          },
        } as ItemParams,
      ],
    };
    const response = await paymentService.addItems(dataSample);
    const addTokenCollection = (await getDataFromStorage(
      "ADD_ITEMS"
    )) as AddItemResponse[];
    addTokenCollection.push(response);
    localStorage.setItem(
      COLLECTION_NAME.ADD_ITEMS,
      JSON.stringify(addTokenCollection)
    );
  };

  const setAdmin = async () => {
    const dataSample: SetAdminParams = {
      addresses: ["0x1FC0DE0432d2ad3641c1d595cC29F3DcB1d010C6"],
      chain: "tomo",
      isActives: [true],
    };
    const response = await paymentService.setAdmins(dataSample);
    const setAdminCollection = (await getDataFromStorage(
      "SET_ADMIN"
    )) as SetAdminReponse[];
    setAdminCollection.push(response);
    localStorage.setItem(
      COLLECTION_NAME.SET_ADMIN,
      JSON.stringify(setAdminCollection)
    );
  };

  const setPartner = async () => {
    100;
    // 1% = 100
    const dataSample: SetPartnerParams = {
      chain: "tomo",
      partnerCode: "son-go-ku",
      partnerInfo: {
        isActive: true,
        // Owner address
        owner: "0x84f7414a77177f9E563A3B1Eb62751567CC6AABA",
        feeReceiver: "0x84f7414a77177f9E563A3B1Eb62751567CC6AABA",
        commissionFee: "100",
        // Fee receiver address
        protocolFee: "100",
      },
    };
    const res = await paymentService.setPartner(dataSample);

    console.log("setPartner", res);
  };

  const setTokenPrice = async () => {
    const dataSample: SetOracleTokensParams = {
      chain: "tomo",
      params: [
        {
          oracleAddress: "0x288ac8e89aebCcd55A191C5E96775c676401e4f6",
          tokenAddress: "0x288ac8e89aebCcd55A191C5E96775c676401e4f6",
        },
      ],
    };
    await paymentService.setOracleTokens(dataSample);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Input placeholder="admin address" />
      <Input placeholder="Token address" />
      <Button onClick={setItem}>Set Item</Button>
      <Button onClick={setAdmin}>Set Admin</Button>
      <Button onClick={setPartner}>Create Partner</Button>
      <Button onClick={setTokenPrice}>Set Token Price</Button>
    </div>
  );
};

export default TestSDK;
