import _get from 'lodash-es/get'
import { getApiService } from "./ApiGenerator";

export const getAuthData = async () => {
  const service = getApiService('basic')
  const response = await service.post({ endpoint: "/auth/login" });
  return _get(response, "data");
};
