import {
  Link,
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
import { useTemplates } from "@/components/hooks/useTemplates";

export const TableWrapper = () => {
  const { templates, deleteTemplate, updateTemplate } = useTemplates();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const columns = [
    { uid: "name", name: "Name" },
    { uid: "actions", name: "Actions" },
  ];

  const pages = Math.ceil((templates?.length || 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return templates?.slice(start, end) || [];
  }, [page, templates]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Templates table with pagination"
        bottomContent={
          templates?.length > 0 ? (
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
        {templates && templates.length > 0 ? (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    <RenderCell
                      template={item}
                      columnKey={columnKey}
                      deleteTemplate={deleteTemplate}
                      updateTemplate={updateTemplate}
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