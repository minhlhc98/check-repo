import React, { useEffect, useState } from 'react';
import _get from 'lodash-es/get';
import { SIGN_MESS } from '@/constants/dapp';
import { LIST_WALLET_SUPPORT } from '@/constants/wallets';
import { useAdminCoreContext } from '../../hooks/useAdminCoreContext';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';
import { AUTH_TYPES } from '@coin98/api_service';
import { IUserProfile } from '@/types';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
// import bgAdmin from '../../assets/images/bgadmin.svg'
import { getAuthData } from '@/service/auth';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile, setUserProfile, setIsAuthenticated, isAuthenticated } =
    useAdminCoreContext();
  console.log('isAuthenticated', { setUserProfile, isAuthenticated, setIsAuthenticated })
  const { openWalletModal } = useWalletModal();
  // const nextRouter = useRouter();
  const { disconnect, signMessage, connected, isNotInstalled } = useWallet();
  // const isNotLoggedIn = !connected || !userProfile;

  const navigateToStore = () => {
    const walletInstallationLink = _get(LIST_WALLET_SUPPORT, '[0].link', '');
    window.open(walletInstallationLink, '_blank');
    return;
  };

  const getOnChainMessage = async () => {
    const signedMessage = await signMessage(SIGN_MESS) as any
    const signedData = _get(signedMessage, 'data');
    if (!signedData) return null;
    localStorage.setItem(AUTH_TYPES.ON_CHAIN_SIGNATURE, signedData);
    return signedData;
  };

  const getAuthToken = async () => {
    const onChainMessageData = await getOnChainMessage();
    if (!onChainMessageData) return;
    const authData = await getAuthData();
    const userProfile = _get(authData, ['data', 'data'], {}) as IUserProfile;
    localStorage.setItem(
      AUTH_TYPES.BASE_JWT,
      _get(authData, ['data', 'token'], '')
    );
    console.log('userProfile', userProfile)
    await setUserProfile(userProfile);
    setIsAuthenticated(true);
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await getAuthToken();
    } catch (error) {
      disconnect();
      setIsAuthenticated(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    if (isNotInstalled) {
      navigateToStore();
      return;
    }

    if (!connected) {
      openWalletModal();
    } else {
      handleSignIn();
    }
  };

  // useEffect(() => {
  //   if (!connected) {
  //     handleSignIn();
  //     return;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [connected]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* background cover */}
      <div className="h-full w-full absolute">
        {/* <img
          alt="background admin"
          src={bgAdmin}
          className="object-cover"
        /> */}
      </div>
      <div className="h-full w-full absolute">
        <img
          alt="background admin"
          src={require('../../assets/images/bgadminline.svg')}
          className="object-cover"
        />
      </div>
      {/* content */}
      <div className="px-8 py-14 max-w-md space-y-8 w-full border-2 rounded-xl z-20">
        <div className="mb-16">
          {/* <Image
            alt="logo admin"
            src="/logoAdmin.svg"
            width={195}
            height={58}
            className="w-40 h-auto block mx-auto select-none"
          /> */}
          <img
            alt="logo admin"
            src={require('../../assets/images/logoAdmin.svg')}
            width={195}
            height={58}
            className="w-40 h-auto block mx-auto select-none"
          />
        </div>
        <div>
          <Button
            className="flex gap-x-2 w-full p-4 h-auto text-white"
            disabled={isLoading}
            onClick={handleConnectWallet}
          >
            {/* <Icon iconName="app_wallet" className="text-xl text-white" /> */}
            <Wallet className="!w-5 !h-5 text-white" />
            <p className="font-semibold text-base">Log In By Coin98 Wallet</p>
          </Button>
        </div>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://forms.gle/ir7byVwkR87W86Xh8"
          className="mx-auto w-fit block text-yellow-500"
        >
          Request your Coin98 Admin account here
        </a>
      </div>
    </div>
  );
}
