import { CHAIN_DATA } from "@wallet/constants";
import { PaymentAbstract } from "../../../abstract";
import { AddItemParams, AddItemResponse, AggregateParams, IsAdminParams, ItemParams, PaymentEngineConfig, SetAdminParams, SetAdminReponse, SetOracleTokensParams, SetOracleTokensReponse, SetPartnerParams, SetPartnerResponse, UodateItemParams, UpdateItemResponse } from "../../../types";
import { PaymentEvmFactory } from "./factory";
import hash from 'crypto-js/sha256'
import { utils } from 'ethers'
export class PaymentEvmAdmin extends PaymentAbstract{
    factory: PaymentEvmFactory

    constructor(_config: PaymentEngineConfig){
        super(_config)
        this.factory = new PaymentEvmFactory(_config.enviroment)
    }

    async setAdmins(params: SetAdminParams): Promise<SetAdminReponse> {
        const { addresses, isActives, chain } = params

        try {  
            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.setAdmins(addresses, isActives).encodeABI()

            const transaction = {
                data,
                contractAddress: address
            }

            const dataAdmins = addresses.map((address, index) => {
                return {
                    address,
                    isActive: isActives[index]
                }
            })

            return {
                transaction,
                data: dataAdmins
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async isAdmins(params: IsAdminParams): Promise<boolean> {
        const { address, chain } = params

        try {
            const { contract } = this.factory.getContract(chain)
            const isAdmin = await contract.methods.isAdmins(address).call()

            return !!isAdmin
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<SetOracleTokensReponse> {
        const { params: paramsSetting, chain } = params

        try {  
            const tokenAddresses = paramsSetting?.map(param => param.tokenAddress)
            const oracleAddresses = paramsSetting?.map(param => param.oracleAddress)

            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.setOracleTokens(tokenAddresses, oracleAddresses).encodeABI()

            const transaction = {
                data,
                contractAddress: address
            }

            const dataOracleTokens = tokenAddresses.map((address, index) => {
                return {
                    tokenAddress: address,
                    oracleAddress: oracleAddresses[index]
                }
            })
            return {
                transaction,
                data: dataOracleTokens,
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async setPartner(params: SetPartnerParams): Promise<SetPartnerResponse> {
        const { partnerCode, partnerInfo, chain } = params

        try {  
            const { isActive, owner, feeReceiver, protocolFee, commissionFee } = partnerInfo
            const partnerInfoFormat = Object.values({
                isActive,
                owner,
                feeReceiver,
                protocolFee,
                commissionFee
            })

            const { contract, address } = this.factory.getContract(chain)
            const data = contract.methods.createPartner(utils.formatBytes32String(partnerCode), partnerInfoFormat).encodeABI()

            const transaction = {
                data,
                contractAddress: address
            }

            const dataPartner = {
                partnerCode,
                partnerInfo
            }

            return {
               transaction,
               data: dataPartner
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }
    
    async addItems(params: AddItemParams): Promise<AddItemResponse> {
        const { params: paramsSetting, chain } = params

        try {
            const { contract, address } = this.factory.getContract(chain)

            //convert params
            const itemCodes = paramsSetting.map((item) =>  this.generateItemCode(item?.itemInfo?.partnerCode))
            const itemCodesByte32 = itemCodes.map((item) =>  utils.formatBytes32String(item))
            const itemInfos = paramsSetting.map((item) => {
                const { isActive, partnerCode, tokenAddress, priceInToken, priceInUsd} = item.itemInfo

                return Object.values({
                    isActive,
                    partnerCode: utils.formatBytes32String(partnerCode),
                    tokenAddress,
                    priceInToken,
                    priceInUsd
                })
            })

            const data = contract.methods.setItems(itemCodesByte32, itemInfos).encodeABI()

            const transaction = {
                data,
                contractAddress: address
            }

            const dataItems: ItemParams[]  = paramsSetting?.map((item, index) => {
                return {
                    itemInfo: item.itemInfo,
                    itemKey: itemCodes[index]
                }
            })

            return {
                transaction,
                data: dataItems
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    async updateItems(params: UodateItemParams): Promise<UpdateItemResponse> {
        const { params: paramsSetting, chain } = params

        try {
            const { contract, address } = this.factory.getContract(chain)

            //convert params
            const itemCodes = paramsSetting.map((item) => utils.formatBytes32String(item.itemKey))
            const itemInfos = paramsSetting.map((item) => {
                const { isActive, partnerCode, tokenAddress, priceInToken, priceInUsd} = item.itemInfo

                return Object.values({
                    isActive,
                    partnerCode: utils.formatBytes32String(partnerCode),
                    tokenAddress,
                    priceInToken,
                    priceInUsd
                })
            })

            const data = contract.methods.setItems(itemCodes, itemInfos).encodeABI()

            const transaction = {
                data,
                contractAddress: address
            }

            return {
                transaction,
                data: paramsSetting
            }
        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    hasChain(chain: string): boolean {
        return Object.values(CHAIN_DATA)
            .filter(chain => chain.isWeb3)
            .map(item => item.chain)
            .includes(chain)
    }

    async aggregate(params: AggregateParams): Promise<{data: string, address: string}>{
        const { chain, params: paramsMulticall } = params
        try {
            const paramsAggregate = paramsMulticall?.map(params => ([params.address, params.data]))
            const { contract, address } = this.factory.getMultiCallContract(chain)

            const data = await contract.methods.aggregate(paramsAggregate).encodeABI()

            return {
                data,
                address
            }

        } catch (error) {
            throw new Error(error as unknown as string)
        }
    }

    generateItemCode(partnerCode: string){
        return partnerCode + '-' + hash(JSON.stringify(partnerCode) + new Date().getTime + Math.random()).toString().slice(0,4)
    }
}