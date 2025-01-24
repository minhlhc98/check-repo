import { ColumnDef } from "@tanstack/react-table";

export function columnsGenerator<TData>(
  columnsData: ColumnDef<TData>[]
): ColumnDef<TData>[] {
  return columnsData;
}
