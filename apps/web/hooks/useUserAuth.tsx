import { resetUserState } from "@store";
import { AUTH_TYPES } from "@coin98/api_service";
import _get from "lodash-es/get";
import { decodeJwt } from "jose";
import { LoggerProvider } from "@/logger";

export const useUserAuth = () => {
  const isAuthTokenValid = () => {
    try {
      const currentAuthToken = localStorage.getItem(AUTH_TYPES.BASE_JWT) || "";
      if (!currentAuthToken) {
        return false;
      }
      const currentTimestamp = Date.now();
      const decodedAuthToken = decodeJwt(currentAuthToken);
      const expTime = _get(decodedAuthToken, "exp", 0) * 1000;
      const gapTime = expTime - currentTimestamp;
      if (gapTime <= 1000 * 60 * 15) {
        return false;
      }
      return true;
    } catch (error) {
      LoggerProvider.log(error, "Authentication Error: ");
      return false;
    }
  };

  const clearUserData = () => {
    resetUserState()
    localStorage.removeItem(AUTH_TYPES.BASE_JWT)
    localStorage.removeItem(AUTH_TYPES.ON_CHAIN_SIGNATURE)
  }

  return {
    isAuthTokenValid,
    clearUserData
  };
};
