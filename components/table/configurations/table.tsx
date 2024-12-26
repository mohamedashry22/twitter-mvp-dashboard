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
import { useConfigurations } from "@/components/hooks/useConfigurations";

export const TableWrapper = () => {
  const { configurations, deleteConfiguration, saveConfiguration } = useConfigurations();
  debugger;
  const columns = [
    { uid: "key", name: "Key" },
    { uid: "value", name: "Value" },
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
        {configurations && configurations.length > 0 ? (
          <TableBody items={configurations || []}>
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