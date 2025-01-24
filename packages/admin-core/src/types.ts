export interface IBaseAdminCore {}

export enum AUTH_TYPES {
  BASE_JWT = "jwt",
  ON_CHAIN_SIGNATURE = "on_chain_signature",
}

export interface IUserProfile {
  address: string;
  createdAt: string;
  isActive: boolean;
  name: string;
  role: string;
  source: string;
  updatedAt: string;
}

export interface IUserStore {
  userProfile: IUserProfile | undefined;
}
