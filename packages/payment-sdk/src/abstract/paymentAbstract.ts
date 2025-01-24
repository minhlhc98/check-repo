import { AddItemParams, AddItemResponse, AggregateParams, IsAdminParams, PaymentEngineConfig, SetAdminParams, SetAdminReponse, SetOracleTokensParams, SetOracleTokensReponse, SetPartnerParams, SetPartnerResponse, UodateItemParams, UpdateItemResponse } from "../types";

export abstract class PaymentAbstract {
    _config: PaymentEngineConfig  
    
    constructor (_config: PaymentEngineConfig) {
      this._config = _config
    }

    abstract setAdmins(params: SetAdminParams): Promise<SetAdminReponse>
    abstract isAdmins(params: IsAdminParams): Promise<boolean>
    abstract setOracleTokens(params: SetOracleTokensParams): Promise<SetOracleTokensReponse>
    abstract setPartner(params: SetPartnerParams): Promise<SetPartnerResponse>
    abstract addItems(params: AddItemParams): Promise<AddItemResponse>
    abstract updateItems(params: UodateItemParams): Promise<UpdateItemResponse>
    abstract hasChain(chain: string): boolean
    aggregate?(chain: AggregateParams): Promise<{data: string, address: string}>
}