import Web3 from "web3"
import { CHAIN_DATA } from '@wallet/constants'
import { AbiItem } from "ethereum-abi-types-generator"
import { MulticallContext, PaymentContext } from "../../../types/contract"
import { PAYMENT_ABI, paymentContract, MULTICALL_ADDRESS, MULTICALL_ABI } from "../../../constants"
import { chainKey, Enviroment } from "../../../types"

export class PaymentEvmFactory {
    environment: Enviroment

    constructor(environment: Enviroment) {
        this.environment = environment
    }

    getProvider(chain: chainKey): Web3 {
        const mProvider = new Web3.providers.HttpProvider(CHAIN_DATA[chain.toString()]?.rpcURL)
        return new Web3(mProvider)
    }

    getContract(chain: chainKey){
        const contractAddress = paymentContract(chain, this.environment === Enviroment.development) 
        const client = this.getProvider(chain)

        const contract = (new client.eth.Contract(
            PAYMENT_ABI as AbiItem[],
            contractAddress
        ) as unknown) as PaymentContext

        return { address: contractAddress, contract }
    }

    getMultiCallContract(chain: chainKey){
        const client = this.getProvider(chain)

        const contract = (new client.eth.Contract(
            MULTICALL_ABI as AbiItem[],
            MULTICALL_ADDRESS
        ) as unknown) as MulticallContext

        return { address: MULTICALL_ADDRESS, contract }
    }
}