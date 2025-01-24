import { Web3ContractContext } from 'ethereum-abi-types-generator'

export type PaymentMethods = 'setAdmins' | 'isAdmins' | 'setOracleTokens' | 'setPartner' | 'setItems'
export type MulticallMethods = 'aggregate'

export type PaymentContext = Web3ContractContext<PaymentContract, PaymentMethods, null, null>
export type MulticallContext = Web3ContractContext<MulticallContract, MulticallMethods, null, null>

export interface EncodeContext {
    encodeABI(): string
}

export interface CallContext {
    call(): Promise<string | boolean>
}

export interface PaymentContract {
    setAdmins(addresses: string[], isActives: boolean[]): EncodeContext
    isAdmins(addresses: string): CallContext
    setOracleTokens(tokenAddresses: string[], oracleAddresses: string[]): EncodeContext
    createPartner(partnerCode: string, partnerInfo: (string | boolean)[]): EncodeContext
    setItems(itemCodes: string[], itemInfos: (string | boolean)[][]): EncodeContext
}

export interface MulticallContract {
    aggregate(data: (string)[][]): EncodeContext
}