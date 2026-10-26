import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  skeletonRows?: number;
};
const DURATION = 0.25;
const STAGGER = 0.05;

export function GenericTable<T>({
  columns,
  data,
  getRowKey,
  className,
  isLoading = false,
  emptyMessage = "No data found.",
  skeletonRows = 3,
}: GenericTableProps<T>) {
  if (columns.length === 0) {
    throw new Error("GenericTable requires at least one column.");
  }

  return (
    <div className={cn("glass-morphism rounded-xl", className)}>
      <div className="overflow-x-auto">
        <table className="table w-full" aria-busy={isLoading}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={column.headerClassName}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <motion.tbody layout>
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                Array.from({ length: Math.max(0, skeletonRows) }, (_, i) => (
                  <tr key={`skeleton-${i}`} aria-hidden="true">
                    {columns.map((column) => (
                      <td key={column.key}>
                        <div className="skeleton h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-10 text-center text-base-content/60"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <motion.tr
                    key={getRowKey(row)}
                    className="hover:bg-base-200/50 transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                      duration: DURATION,
                      delay: STAGGER * index,
                    }}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className={column.className}>
                        {column.render(row, index)}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
