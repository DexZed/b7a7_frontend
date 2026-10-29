"use client";

import PageHeading from "@/components/pageHeading";
import { PaginationControls } from "@/components/pagination";
import SearchField from "@/components/searchField";
import { GenericTable } from "@/components/table";
import { usePagination } from "@/hooks/use-pagination";
import { useUnenrolledClasses } from "@/hooks/use-student-hooks";
import { useSession } from "@/lib/authClient";
import { Class } from "@/lib/types";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useDeferredValue, useState, useTransition } from "react";

function ClassesList() {
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(searchInput);

  const activeQuery = {
    ...query,
    search: deferredSearch || undefined,
  };

  const {
    data: unenrolledClassesData,
    isLoading,
    isFetching,
  } = useUnenrolledClasses(token, activeQuery);

  const classes = unenrolledClassesData?.data ?? [];
  const pagination = unenrolledClassesData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        page: 1,
      }));
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        page: newPage,
      }));
    });
  };

  const { pageItems, goToPage, firstPage, lastPage, previousPage, nextPage } =
    usePagination({
      page: pagination.page,
      totalPages: pagination.totalPages,
      setPage: handlePageChange,
    });

  const columns = [
    {
      key: "serial",
      header: "#",
      render: (_: Class, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (c: Class) => c.name,
    },
    {
      key: "description",
      header: "Description",
      render: (c: Class) => c.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (c: Class) => new Date(c.createdAt).toLocaleDateString(),
    },
    {
      key: "details",
      header: "Details",
      render: (c: Class) => (
        <Link href={`/student/${c.id}`} className="btn btn-sm btn-ghost">
          {" "}
          <Info />
        </Link>
      ),
    },
  ];

  return (
    <>
      <article className="flex flex-col justify-center items-center p-4">
        <PageHeading title="Available Classes" />
        <aside className="w-full flex flex-col gap-4">
          <SearchField value={searchInput} onChange={handleSearchChange} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isFetching || isPending ? 0.5 : 1,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <GenericTable
              columns={columns}
              data={classes}
              getRowKey={(clas) => clas.id}
              isLoading={isLoading || isFetching || isPending}
              emptyMessage="No matching classes found."
              skeletonRows={5}
            />
          </motion.div>

          <div className="flex justify-center items-center">
            <PaginationControls
              firstPage={firstPage}
              previousPage={previousPage}
              nextPage={nextPage}
              lastPage={lastPage}
              pageItems={pageItems}
              page={pagination.page}
              totalPages={pagination.totalPages}
              goToPage={goToPage}
            />
          </div>
        </aside>
      </article>
    </>
  );
}

export default ClassesList;
