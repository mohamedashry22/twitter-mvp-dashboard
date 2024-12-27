import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./render-cell";
import { useWebhooks } from "@/components/hooks/useWebhooks";

export const TableWrapper = () => {
  const { webhooks, deleteWebhook, updateWebhook } = useWebhooks();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const columns = [
    { uid: "name", name: "Name" },
    { uid: "description", name: "Description" },
    { uid: "actions", name: "Actions" },
  ];

  const pages = Math.ceil((webhooks?.length || 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return webhooks?.slice(start, end) || [];
  }, [page, webhooks]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Webhooks table with pagination"
        bottomContent={
          webhooks?.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
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
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {webhooks && webhooks.length > 0 ? (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    <RenderCell
                      webhook={item}
                      columnKey={columnKey}
                      deleteWebhook={deleteWebhook}
                      updateWebhook={updateWebhook}
                    />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
};