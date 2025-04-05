import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";

const PaginationControls = React.memo(function PaginationControls({
  page,
  limit,
  dataLength,
  onPageChange,
}: {
  page: number;
  limit: number;
  dataLength: number;
  onPageChange: (newPage: number) => void;
}) {
  const totalPages = Math.ceil(dataLength / limit);

  const getPagesToDisplay = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 4) pages.push("start-ellipsis");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 3) pages.push("end-ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToDisplay = getPagesToDisplay();

  return (
    <Pagination className="absolute bottom-20 left-0 right-0 w-full justify-center">
      <PaginationContent className="flex flex-wrap justify-center gap-1">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            className="cursor-pointer"
          />
        </PaginationItem>

        {pagesToDisplay.map((item, index) =>
          item === "start-ellipsis" || item === "end-ellipsis" ? (
            <PaginationItem key={item + index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                className={`cursor-pointer ${page === item ? "font-bold" : ""}`}
                isActive={page === item}
                onClick={() => onPageChange(item as number)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

export default PaginationControls;
