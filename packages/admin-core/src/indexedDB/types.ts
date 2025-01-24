import { DBSchema } from 'idb';
import { IUserProfile } from '../types';

export interface IAdminCoreDBSchema extends DBSchema {
  userProfile: {
    key: string;
    value: IUserProfile;
  };
}
