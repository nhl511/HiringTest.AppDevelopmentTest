export interface TUser {
  id?: string;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
}

export interface CustomTableMeta {
  page: number;
  limit: number;
  sortOrder: eSortOrder;
  sortKey: eSortKey;
  filter: eFilter;
  setSortOrder: React.Dispatch<React.SetStateAction<eSortOrder>>;
  setSortKey: React.Dispatch<React.SetStateAction<eSortKey>>;
  setFilter: React.Dispatch<React.SetStateAction<eFilter>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export enum eSortKey {
  name = "name",
  balance = "balance",
  email = "email",
  registerAt = "registerAt",
}

export enum eSortOrder {
  default = "",
  asc = "asc",
  desc = "desc",
}

export enum eFilter {
  all = "",
  active = "active",
  inactive = "inactive",
}

export interface tSortAndFilterContext {
  sortKey: eSortKey;
  setSortKey: React.Dispatch<React.SetStateAction<eSortKey>>;
  sortOrder: eSortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<eSortOrder>>;
  filter: eFilter;
  setFilter: React.Dispatch<React.SetStateAction<eFilter>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
