import { eFilter, eSortKey, eSortOrder, tSortAndFilterContext } from "@/types";
import React from "react";

const SortAndFilterContext = React.createContext<tSortAndFilterContext | null>(
  null
);

const SortAndFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortKey, setSortKey] = React.useState(eSortKey.name);
  const [sortOrder, setSortOrder] = React.useState(eSortOrder.default);
  const [filter, setFilter] = React.useState(eFilter.all);
  const [search, setSearch] = React.useState("");

  return (
    <SortAndFilterContext.Provider
      value={{
        sortKey,
        setSortKey,
        sortOrder,
        setSortOrder,
        filter,
        setFilter,
        search,
        setSearch,
      }}
    >
      {children}
    </SortAndFilterContext.Provider>
  );
};

export const useSortAndFilter = () => {
  const context = React.useContext(SortAndFilterContext);
  if (!context) {
    throw new Error("useSort must be used within a SortAndFilterProvider");
  }
  return context;
};

export default SortAndFilterProvider;
