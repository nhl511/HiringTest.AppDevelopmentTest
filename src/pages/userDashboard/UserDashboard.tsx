import { addUser, getUsers } from "@/db";
import { eFilter, eSortKey, eSortOrder, TUser } from "@/types";
import React from "react";
import { DataTable } from "./components/data-table";
import useSWR from "swr";
import PaginationControls from "./components/PaginationControls";
import LimitSelect from "./components/LimitSelect";
import Loading from "./components/Loading";
import { fullNames } from "@/data";
import { columns } from "./components/columns";
import { useSortAndFilter } from "@/contexts/SortContext";
import SearchInput from "./components/SearchInput";
import { useTheme } from "@/contexts/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function UserDashboard() {
  const initialized = React.useRef(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [isDataGenerated, setIsDataGenerated] = React.useState(false);
  const {
    sortKey,
    sortOrder,
    setSortKey,
    setSortOrder,
    filter,
    setFilter,
    search,
  } = useSortAndFilter();

  const generateData = async () => {
    const data = await getUsers({
      page: 1,
      limit: 10,
      sortKey: eSortKey.name,
      sortOrder: eSortOrder.default,
      filter: eFilter.all,
      search: "",
    });
    if (data.total === 0) {
      for (let i = 0; i <= 99; i++) {
        await addUser({
          name: fullNames[i],
          balance: i,
          email: `${fullNames[i].split(" ")[0].toLowerCase()}@gmail.com`,
          registerAt: new Date(),
          active: i === 0 || i === 2 || i === 5 || i === 11 ? false : true,
        });
      }
    }
    setIsDataGenerated(true);
  };
  const handleLimitChange = React.useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  React.useEffect(() => {
    if (!initialized.current) {
      generateData();
      initialized.current = true;
    }
  }, []);

  const { data, isLoading } = useSWR<{ users: TUser[]; total: number }>(
    isDataGenerated
      ? `get users page ${page} and  ${limit} sortOrder ${sortOrder} sortKey ${sortKey} filter ${filter} search ${search}`
      : null,
    async () =>
      await getUsers({ page, limit, sortKey, sortOrder, filter, search }),
    { revalidateOnFocus: false }
  );

  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto py-10 min-h-screen relative px-4 md:px-0">
      <div className="flex justify-between mb-4">
        <SearchInput setPage={setPage} />
        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant="link"
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>

          <LimitSelect limit={limit} onLimitChange={handleLimitChange} />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <DataTable
            data={data.users}
            columns={columns}
            meta={{
              page,
              limit,
              sortOrder,
              sortKey,
              filter,
              setSortOrder,
              setSortKey,
              setFilter,
              setPage,
            }}
          />
        )
      )}
      {data?.total && (
        <PaginationControls
          page={page}
          limit={limit}
          dataLength={data?.total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default UserDashboard;
