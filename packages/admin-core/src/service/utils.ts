import { ApiService } from "./baseService";

export const getApiService = (serviceName: 'basic') => {
  switch (serviceName) {
    case 'basic':
      return new ApiService(process.env.NEXT_PUBLIC_API);
  }
};
