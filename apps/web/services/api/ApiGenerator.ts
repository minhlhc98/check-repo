import { ApiService } from "@coin98/api_service";
import { API_URL } from "../constants";

export const getApiService = (serviceName: "basic") => {
  switch (serviceName) {
    case "basic":
      return new ApiService(API_URL.PUBLIC_API);
  }
};
