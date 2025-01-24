import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { IndexedDBService } from '@/indexedDB';
import { IUserProfile } from '@/types';
import { USER_PROFILE_RECORD } from '@/constants/indexDB';
import { useUserAuth } from '@/hooks/useUserAuth';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import AdminWalletProvider from './AdminWalletProvider';
import Coin98WalletProvider from './Coin98WalletProvider';
import Coin98AdapterModal from './Coin98AdapterModal';

export interface IAdminCore {
  isDBInited: boolean;
  isAuthenticated: boolean;
  userProfile: IUserProfile | undefined;
  setUserProfile: (userProfile: IUserProfile) => Promise<void>;
  dropUserProfile: () => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AdminCoreContext = React.createContext({} as IAdminCore);

export const AdminCoreProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDBInited, setIsDBInited] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(
    undefined
  );
  const userRecordId = useRef<string>('profile-data');
  const { isAuthTokenValid, clearAuthData } = useUserAuth();

  console.log('isDBInited', isDBInited);
  const setUserProfileData = async (_userProfile: IUserProfile) => {
    if (!isDBInited) return;
    await IndexedDBService.insertRow(_userProfile, userRecordId.current);
    console.log('success', _userProfile);
    setUserProfile(_userProfile);
  };

  useEffect(() => {
    console.log('state change: ', userProfile);
  }, [userProfile]);

  const dropUserProfile = async () => {
    if (!isDBInited) return;
    await IndexedDBService.dropRow(userRecordId.current);
  };

  useEffect(() => {
    const initDB = async () => {
      try {
        await IndexedDBService.init();
        setIsDBInited(true);
      } catch (error) {
        console.log('error', error);
      }
    };
    initDB();
  }, []);

  React.useEffect(() => {
    if (!isDBInited) return;

    const initUserProfile = async () => {
      const userProfileData = await IndexedDBService.get(USER_PROFILE_RECORD);
      setUserProfile(userProfileData);
      if (userProfileData) {
        setIsAuthenticated(true);
      }
    };

    if (!isAuthTokenValid()) {
      clearAuthData();
      dropUserProfile().then(() => {
        setIsAuthenticated(false);
      });
    } else {
      initUserProfile();
    }
  }, [isDBInited]);

  return (
    <AdminCoreContext.Provider
      value={{
        isDBInited: isDBInited,
        userProfile: userProfile,
        isAuthenticated: isAuthenticated,
        setUserProfile: setUserProfileData,
        dropUserProfile,
        setIsAuthenticated,
      }}
    >
      {children}
    </AdminCoreContext.Provider>
  );
};
