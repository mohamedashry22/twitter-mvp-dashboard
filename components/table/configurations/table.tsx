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
import { useConfigurations } from "@/components/hooks/useConfigurations";

export const TableWrapper = () => {
  const { configurations, deleteConfiguration, saveConfiguration } = useConfigurations();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const columns = [
    { uid: "key", name: "Key" },
    { uid: "value", name: "Value" },
    { uid: "actions", name: "Actions" },
  ];

  const pages = Math.ceil((configurations?.length || 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return configurations?.slice(start, end) || [];
  }, [page, configurations]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Configurations table with pagination"
        bottomContent={
          configurations?.length > 0 ? (
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
        {configurations && configurations.length > 0 ? (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    <RenderCell
                      configuration={item}
                      columnKey={columnKey}
                      deleteConfiguration={deleteConfiguration}
                      updateConfiguration={saveConfiguration}
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