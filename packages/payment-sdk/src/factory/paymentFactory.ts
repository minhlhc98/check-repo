import { PaymentAbstract } from "../abstract"
import { AddItemParams, AddItemResponse, AggregateParams, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetAdminReponse, SetOracleTokensParams, SetOracleTokensReponse, SetPartnerParams, SetPartnerResponse, UodateItemParams, UpdateItemResponse } from "../types"

export class PaymentFactory {
    engines: PaymentAbstract[]

    constructor(configs: PaymentEngineConfig){
        //@ts-expect-error
        this.engines = configs.engines.map(Engines => new Engines(configs))   
    }

    getPaymentByChain(chain: string){
        const engine = this.engines.find(engine => {
            return engine.hasChain(chain)
        })
        
        if(!engine) throw new Error('Engine not exists')

        return engine
    }

    async setAdmins(params: SetAdminParams): Promise<SetAdminReponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setAdmins(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }


    async isAdmins(params: IsAdminParams): Promise<boolean>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.isAdmins(params)
            } catch (error) {
                return false
            }
        }

        throw new Error('Method not implement')
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<SetOracleTokensReponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setOracleTokens(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

    async setPartner(params: SetPartnerParams): Promise<SetPartnerResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.setPartner(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }


    async addItems(params: AddItemParams): Promise<AddItemResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.addItems(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

    async updateItems(params: UodateItemParams): Promise<UpdateItemResponse>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                return engine.updateItems(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

    async aggregate(params: AggregateParams): Promise<{data: string, address: string}>{
        const { chain } = params

        const engine = this.getPaymentByChain(chain)

        if(engine){
            try {
                //@ts-expect-error
                return engine?.aggregate(params)
            } catch (error) {
                 throw new Error('Method not implement')
            }
        }

        throw new Error('Method not implement')
    }

}