import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./render-cell";
import { useTemplates } from "@/components/hooks/useTemplates";

export const TableWrapper = () => {
  const { templates, deleteTemplate, updateTemplate } = useTemplates();

  const columns = [
    { uid: "name", name: "Name" },
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
        {templates && templates.length > 0 ? (
          <TableBody items={templates || []}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    {/* RenderCell used as a React component */}
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