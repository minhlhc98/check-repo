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
