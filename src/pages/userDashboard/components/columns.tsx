import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomTableMeta, eFilter, eSortKey, eSortOrder, TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  ClockArrowDown,
  ClockArrowUp,
  Funnel,
  Pencil,
  Trash,
} from "lucide-react";

export const columns: ColumnDef<TUser>[] = [
  {
    id: "no",
    header: "#",
    cell: ({ row, table }) => {
      const page = (table.options.meta as CustomTableMeta)?.page ?? 1;
      const limit = (table.options.meta as CustomTableMeta)?.limit ?? 10;
      const index = row.index + 1 + (page - 1) * limit;

      return <span className="w-12 text-xs">{index}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ table }) => {
      const currentSort = (table.options.meta as CustomTableMeta)?.sortOrder;
      const sortKey = (table.options.meta as CustomTableMeta)?.sortKey;
      const setSortOrder = (table.options.meta as CustomTableMeta)
        ?.setSortOrder;
      const setSortKey = (table.options.meta as CustomTableMeta)?.setSortKey;

      const handleSortClick = () => {
        setSortKey(eSortKey.name);
        switch (true) {
          case eSortOrder.desc === currentSort && sortKey === eSortKey.name:
            setSortOrder(eSortOrder.default);
            break;
          case eSortOrder.asc === currentSort && sortKey === eSortKey.name:
            setSortOrder(eSortOrder.desc);
            break;
          default:
            setSortOrder(eSortOrder.asc);
            break;
        }
      };

      return (
        <Button
          variant="ghost"
          onClick={handleSortClick}
          className="cursor-pointer"
        >
          NAME
          {eSortOrder.desc === currentSort && sortKey === eSortKey.name ? (
            <ArrowDownZA />
          ) : eSortOrder.asc === currentSort && sortKey === eSortKey.name ? (
            <ArrowDownAZ />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ table }) => {
      const currentSort = (table.options.meta as CustomTableMeta)?.sortOrder;
      const sortKey = (table.options.meta as CustomTableMeta)?.sortKey;
      const setSortOrder = (table.options.meta as CustomTableMeta)
        ?.setSortOrder;
      const setSortKey = (table.options.meta as CustomTableMeta)?.setSortKey;

      const handleSortClick = () => {
        setSortKey(eSortKey.balance);
        switch (true) {
          case eSortOrder.desc === currentSort && sortKey === eSortKey.balance:
            setSortOrder(eSortOrder.default);
            break;
          case eSortOrder.asc === currentSort && sortKey === eSortKey.balance:
            setSortOrder(eSortOrder.desc);
            break;
          default:
            setSortOrder(eSortOrder.asc);
            break;
        }
      };
      return (
        <Button
          variant="ghost"
          onClick={handleSortClick}
          className="cursor-pointer"
        >
          BALANCE
          {eSortOrder.desc === currentSort && sortKey === eSortKey.balance ? (
            <ArrowDown10 />
          ) : eSortOrder.asc === currentSort && sortKey === eSortKey.balance ? (
            <ArrowDown01 />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ table }) => {
      const currentSort = (table.options.meta as CustomTableMeta)?.sortOrder;
      const sortKey = (table.options.meta as CustomTableMeta)?.sortKey;
      const setSortOrder = (table.options.meta as CustomTableMeta)
        ?.setSortOrder;
      const setSortKey = (table.options.meta as CustomTableMeta)?.setSortKey;

      const handleSortClick = () => {
        setSortKey(eSortKey.email);
        switch (true) {
          case eSortOrder.desc === currentSort && sortKey === eSortKey.email:
            setSortOrder(eSortOrder.default);
            break;
          case eSortOrder.asc === currentSort && sortKey === eSortKey.email:
            setSortOrder(eSortOrder.desc);
            break;
          default:
            setSortOrder(eSortOrder.asc);
            break;
        }
      };
      return (
        <Button
          variant="ghost"
          onClick={handleSortClick}
          className="cursor-pointer"
        >
          EMAIL
          {eSortOrder.desc === currentSort && sortKey === eSortKey.email ? (
            <ArrowDownZA />
          ) : eSortOrder.asc === currentSort && sortKey === eSortKey.email ? (
            <ArrowDownAZ />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      return (
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
          {email}
        </a>
      );
    },
  },

  {
    accessorKey: "registerAt",
    header: ({ table }) => {
      const currentSort = (table.options.meta as CustomTableMeta)?.sortOrder;
      const sortKey = (table.options.meta as CustomTableMeta)?.sortKey;
      const setSortOrder = (table.options.meta as CustomTableMeta)
        ?.setSortOrder;
      const setSortKey = (table.options.meta as CustomTableMeta)?.setSortKey;

      const handleSortClick = () => {
        setSortKey(eSortKey.registerAt);
        switch (true) {
          case eSortOrder.desc === currentSort &&
            sortKey === eSortKey.registerAt:
            setSortOrder(eSortOrder.default);
            break;
          case eSortOrder.asc === currentSort &&
            sortKey === eSortKey.registerAt:
            setSortOrder(eSortOrder.desc);
            break;
          default:
            setSortOrder(eSortOrder.asc);
            break;
        }
      };
      return (
        <Button
          variant="ghost"
          onClick={handleSortClick}
          className="cursor-pointer"
        >
          REGISTRATION
          {eSortOrder.desc === currentSort &&
          sortKey === eSortKey.registerAt ? (
            <ClockArrowDown />
          ) : eSortOrder.asc === currentSort &&
            sortKey === eSortKey.registerAt ? (
            <ClockArrowUp />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("registerAt"));
      const formatted = date.toISOString().split("T")[0];
      const detailedDateTime = date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      return (
        <HoverCard>
          <HoverCardTrigger>
            <Button variant="link">{formatted}</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-white/10 backdrop-blur-sm">
            <p className="text-sm text-gray-700">{detailedDateTime}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },

  {
    accessorKey: "active",
    header: ({ table }) => {
      const filter = (table.options.meta as CustomTableMeta)?.filter;
      const setFilter = (table.options.meta as CustomTableMeta)?.setFilter;
      const setPage = (table.options.meta as CustomTableMeta)?.setPage;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              STATUS
              <Funnel />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-4 bg-white/10 backdrop-blur-sm">
            <RadioGroup
              onValueChange={(val) => {
                setFilter(val as eFilter);
                setPage(1);
              }}
              defaultValue={filter}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={eFilter.all} id="r1" />
                <Label htmlFor="r1">
                  <Badge variant="outline">All</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={eFilter.active} id="r2" />
                <Label htmlFor="r2">
                  <Badge variant="outline">Active</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={eFilter.inactive} id="r3" />
                <Label htmlFor="r3">
                  <Badge variant="destructive">Inactive</Badge>
                </Label>
              </div>
            </RadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("active") ? (
            <Badge variant="outline">Active</Badge>
          ) : (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <div className="flex gap-2 justify-end">
        <Button disabled={true} variant="outline" className="cursor-pointer">
          <Pencil />
        </Button>
        <Button disabled={true} variant="outline" className="cursor-pointer">
          <Trash />
        </Button>
      </div>
    ),
  },
];
