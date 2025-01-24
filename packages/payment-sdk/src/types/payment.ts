import { PaymentAbstract } from "../abstract";
import { chainKey } from "./chain";

export enum Enviroment {
    production = 'production',
    development = 'development'
}

export interface PaymentEngineConfig{
    engines: PaymentAbstract[],
    enviroment: Enviroment
}

export interface Transaction {
    data: string,
    contractAddress: string
}

export interface SetAdminParams {
    addresses: string[],
    isActives: boolean[],
    chain: chainKey
}

export interface SetAdminReponse {
    data: Array<{
        address: string,
        isActive: boolean
    }>
    transaction: Transaction
}

export interface IsAdminParams {
    address: string,
    chain: chainKey
}

export interface SetOracleTokensParams {
    params: Array<{
        tokenAddress: string,
        oracleAddress: string
    }>
    chain: chainKey
}

export interface SetOracleTokensReponse {
    data: Array<{
        tokenAddress: string,
        oracleAddress: string
    }>
    transaction: Transaction
}

export interface SetPartnerParams {
    partnerCode: string
    partnerInfo: {
        isActive: boolean,
        owner: string,
        feeReceiver: string,
        protocolFee: string,
        commissionFee: string
    }
    chain: chainKey
}

export interface SetPartnerResponse {
    data: {
        partnerCode: string
        partnerInfo: {
            isActive: boolean,
            owner: string,
            feeReceiver: string,
            protocolFee: string,
            commissionFee: string
        }
    }
    transaction: Transaction
}

export interface ItemParams {
    itemKey: string,
    itemInfo: {
      isActive: boolean,
      partnerCode: string,
      tokenAddress: string,
      priceInToken: string,
      priceInUsd: string,
    },
}

export interface UodateItemParams {
    params: Array<ItemParams>
    chain: chainKey
}

export interface UpdateItemResponse {
    data:Array<ItemParams>
    transaction: Transaction
}

export interface AddItemParams {
    params: Array<Omit<ItemParams, 'itemKey'>>
    chain: chainKey
}

export interface AddItemResponse {
    data: Array<ItemParams>
    transaction: Transaction
}


export interface AggregateParams {
    chain: chainKey,
    params: Array<{
        address: string,
        data: string
    }>
}