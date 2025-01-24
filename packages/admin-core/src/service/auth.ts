import { getApiService } from "./utils";
import _get from 'lodash-es/get'

export const getAuthData = async () => {
    const service = getApiService('basic')
    const response = await service.post({ endpoint: "/auth/login" });
    return _get(response, "data");
  };
  