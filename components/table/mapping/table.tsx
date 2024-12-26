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
import { useMappings } from "@/components/hooks/useMappings";
import { useWebhooks } from "@/components/hooks/useWebhooks";
import { useTemplates } from "@/components/hooks/useTemplates";

export const TableWrapper = () => {
  const { mappings, deleteMapping } = useMappings();
  const { webhooks } = useWebhooks();  // Assuming you fetch webhooks here
  const { templates } = useTemplates();  // Assuming you fetch templates here

  const columns = [
    { uid: "webhookId", name: "Webhook" },
    { uid: "templateId", name: "Template" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Mappings table">
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
          <TableBody items={mappings}>
            {(item) => (
              <TableRow key={(item as any).id}>
                {(columnKey) => (
                  <TableCell>
                    <RenderCell
                      mapping={item}
                      columnKey={columnKey}
                      deleteMapping={deleteMapping}
                      webhooks={webhooks}  // Pass webhooks
                      templates={templates}  // Pass templates
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
