import { IDBPDatabase, openDB } from 'idb';
import { INDEXED_DB_NAME } from '../constants/indexDB';
import { IAdminCoreDBSchema } from './types';
import { IUserProfile } from '../types';
import { v4 } from 'uuid';

export class IndexedDBService {
  private static connection: IDBPDatabase<IAdminCoreDBSchema>;
  static init = async (indexedDBName: string = INDEXED_DB_NAME) => {
    this.connection = await openDB<IAdminCoreDBSchema>(indexedDBName, 1, {
      upgrade: (db) => {
        db.createObjectStore('userProfile');
      },
    });
  };

  static insertRow = async (newKV: IUserProfile, key: string | undefined | IDBKeyRange) => {
    return this.connection.put('userProfile', newKV, key ?? v4());
  };

  static dropRow = async (key: string | IDBKeyRange) => {
    try {
      this.connection.delete('userProfile', key);
      return true
    } catch (error) {
      return false
    }
  };

  static get = async (key: string) => {
    return this.connection.get('userProfile', key)
  }
}
