// table.tsx
import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { useTweets } from "@/components/hooks/useTweets";
import { toast } from "react-toastify";

interface TableWrapperProps {
  tweets: any[];
  isLoading: boolean;
  type: 'success' | 'failed';
}

export const TableWrapper = ({ tweets, isLoading, type }: TableWrapperProps) => {
  const [page, setPage] = useState(1);
  const { retryFailedTweet } = useTweets();
  const rowsPerPage = 5;

  const columns = [
    { uid: "status", name: "Content" },
    { uid: "createdAt", name: "Date" },
    { uid: "type", name: "Status" },
    ...(type === "failed" ? [{ uid: "actions", name: "Actions" }] : []),
  ];


  
  const pages = Math.ceil((tweets?.length || 0) / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return tweets?.slice(start, end) || [];
  }, [page, tweets]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Tweets table"
        bottomContent={
          tweets?.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          items={items}
          isLoading={isLoading}
          loadingContent={<div>Loading...</div>}
          emptyContent={"No tweets to display."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell
                    tweet={item}
                    columnKey={columnKey as any}
                    retryCallback={type === 'failed' ? async (id) => {
                      try {
                        await retryFailedTweet.mutateAsync(id as any);
                        toast.success("Tweet retry successful");
                      } catch (error) {
                        toast.error("Failed to retry tweet. Please try again.");
                      }
                    } : undefined}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};