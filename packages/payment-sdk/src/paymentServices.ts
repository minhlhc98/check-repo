import { Engines } from "./constants";
import { PaymentFactory } from "./factory";
import { AddItemParams, AddItemResponse, AggregateParams, Enviroment, IsAdminParams, SetAdminParams, SetAdminReponse, SetOracleTokensParams, SetOracleTokensReponse, SetPartnerParams, SetPartnerResponse, UodateItemParams, UpdateItemResponse } from "./types";

interface Config {
    enviroment: Enviroment
}

export class PaymentAdmin {
    factory?: PaymentFactory
    static instance: PaymentAdmin
    
    constructor({ enviroment }: Config) {
        if(PaymentAdmin.instance){
            return PaymentAdmin.instance
        }

        this.factory = new PaymentFactory({engines: Engines, enviroment })
        PaymentAdmin.instance = this;

        return this
    }

    async setAdmins(params: SetAdminParams): Promise<SetAdminReponse>{
        if(this.factory){
            return await this.factory.setAdmins(params)
        }

        throw new Error('Method not implement')
    }


    async isAdmins(params: IsAdminParams): Promise<boolean>{
        if(this.factory){
            return await this.factory.isAdmins(params)
        }

        return false
    }

    async setOracleTokens(params: SetOracleTokensParams): Promise<SetOracleTokensReponse>{
        if(this.factory){
            return await this.factory.setOracleTokens(params)
        }

        throw new Error('Method not implement')
    }

    async setPartner(params: SetPartnerParams): Promise<SetPartnerResponse>{
        if(this.factory){
            return await this.factory.setPartner(params)
        }

        throw new Error('Method not implement')
    }

    async updateItems(params: UodateItemParams): Promise<UpdateItemResponse>{
        if(this.factory){
            return await this.factory.updateItems(params)
        }

        throw new Error('Method not implement')
    }

    async addItems(params: AddItemParams): Promise<AddItemResponse>{
        if(this.factory){
            return await this.factory.addItems(params)
        }

        throw new Error('Method not implement')
    }

    async aggregate(params: AggregateParams): Promise<{data: string, address: string}>{
        console.log("🚀 ~ PaymentAdmin ~ aggregator ~ his.factory:", this.factory)
        if(this.factory){
            return await this.factory?.aggregate(params)
        }

        throw new Error('Method not implement')
    }
}