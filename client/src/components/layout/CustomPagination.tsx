import { updateSearchParams } from "@/utils/helpers";
import { Ellipsis } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

type Props = {
  totalCount: number;
  resPerPage: number;
};

const CustomPagination = ({ totalCount, resPerPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = (selected + 1).toString();
    const params = updateSearchParams(searchParams, "page", page);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  return (
    <div>
      <ReactPaginate
        className="mx-auto flex w-full justify-center items-center my-6"
        breakLabel={<Ellipsis />}
        initialPage={currentPage > 1 ? currentPage - 1 : undefined}
        nextLabel={
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalCount / resPerPage)}
        previousLabel={
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex flex-row items-center gap-1"
        pageLinkClassName="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
        activeClassName="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9"
      />
    </div>
  );
};

export default CustomPagination;
