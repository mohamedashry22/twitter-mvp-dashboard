import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./render-cell";
import { useWebhooks } from "@/components/hooks/useWebhooks";

export const TableWrapper = () => {
  const { webhooks, deleteWebhook, updateWebhook } = useWebhooks();
  debugger;
  const columns = [
    { uid: "name", name: "Name" },
    { uid: "description", name: "Description" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
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
          <TableBody items={webhooks || []}>
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