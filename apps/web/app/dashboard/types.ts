export type IQueueTransactionType =
  | "SET_ADMIN"
  | "SET_PARTNER"
  | "ADD_TOKEN"
  | "SET_TOKENS_PRICE";

export interface IQueueTransactionInfo<TData> {
  timestamp: number;
  type: IQueueTransactionType;
  data: TData;
  id: string;
}

export interface IDataTableProvider<TData> {
  setCurrentRow: (value: TData) => void;
  data: TData[];
}

export type IMulticallData = Array<{ address: string; data: string }>;

export interface IBaseApproveModalProps<TData> {
  data: TData;
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onApprove: () => Promise<void>;
  onOpenChange: (value: boolean) => void;
}