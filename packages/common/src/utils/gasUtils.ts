import web3Lib from "web3";
import { TransactionConfig } from "web3-core";

export interface IEstimateGasParams {
  generateTsx: TransactionConfig;
  rpc: string;
  //   TODO floating-point number Eg: 0.1, 1.2, ...
  bufferGasFactorNumber?: number;
}

export const estimateGas = async ({
  generateTsx,
  rpc,
  bufferGasFactorNumber = 1,
}: IEstimateGasParams) => {
  return new Promise<number>((resolve, reject) => {
    const web3 = new web3Lib(new web3Lib.providers.HttpProvider(rpc));
    web3.eth
      .estimateGas(generateTsx, (error: Error, gas: number) => {
        if (error) {
          console.log(error);
          reject(0);
        }
        resolve(gas * bufferGasFactorNumber)
      })
  });
};
