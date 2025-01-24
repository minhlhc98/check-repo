import { LoggerProvider } from "@/logger";
import { COLLECTION_NAME } from "@/storage-provider/constants";

export async function getDataFromStorage<TValue>(
  storageKey: keyof typeof COLLECTION_NAME
) {
  return new Promise<TValue>((res) => {
    try {
      const collectionData = localStorage.getItem(storageKey);
      if (!collectionData) return res([] as TValue)
      return res(JSON.parse(collectionData) as TValue);
    } catch (error) {
      LoggerProvider.log(error, LoggerProvider.STORAGE_PREFIX);
      return [] as TValue;
    }
  });
}
