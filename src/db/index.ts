import { eFilter, eSortKey, eSortOrder } from "./../types";
import { TUser } from "@/types";
import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const initDB = async () => {
  return openDB("app_development_test", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" });
      }
    },
  });
};

export const addUser = async ({
  id = uuidv4(),
  name,
  balance,
  email,
  registerAt,
  active,
}: TUser) => {
  const db = await initDB();
  db.transaction("users", "readwrite")
    .objectStore("users")
    .add({ id, name, balance, email, registerAt, active });
  return true;
};

export const getUsers = async ({
  page,
  limit,
  sortKey,
  sortOrder,
  filter,
  search,
}: {
  page: number;
  limit: number;
  sortKey: eSortKey;
  sortOrder: eSortOrder;
  filter: eFilter;
  search: string;
}) => {
  const db = await initDB();
  const users = await db.transaction("users").objectStore("users").getAll();

  const filteredUsers =
    filter === eFilter.all
      ? users
      : users.filter((user) =>
          user.active === (filter === eFilter.active) ? true : false
        );

  const keyword = search.trim().toLowerCase();
  const filteredBySearch = keyword
    ? filteredUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword)
      )
    : filteredUsers;

  const sortedUsers = filteredBySearch.sort((a, b) => {
    if (sortOrder === eSortOrder.default) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortOrder === eSortOrder.asc ? -1 : 1;
    if (aVal > bVal) return sortOrder === eSortOrder.asc ? 1 : -1;
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + limit);

  return {
    users: paginatedUsers,
    total: filteredBySearch.length,
  };
};
