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
import { useMappings } from "@/components/hooks/useMappings";
import { useWebhooks } from "@/components/hooks/useWebhooks";
import { useTemplates } from "@/components/hooks/useTemplates";

export const TableWrapper = () => {
  const { mappings, deleteMapping } = useMappings();
  const { webhooks } = useWebhooks();
  const { templates } = useTemplates();
  
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const columns = [
    { uid: "webhookId", name: "Webhook" },
    { uid: "templateId", name: "Template" },
    { uid: "actions", name: "Actions" },
  ];

  const pages = Math.ceil((mappings?.length || 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return mappings?.slice(start, end) || [];
  }, [page, mappings]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Mappings table with pagination"
        bottomContent={
          mappings?.length > 0 ? (
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
        {mappings && mappings.length > 0 ? (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    <RenderCell
                      mapping={item}
                      columnKey={columnKey}
                      deleteMapping={deleteMapping}
                      webhooks={webhooks}
                      templates={templates}
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