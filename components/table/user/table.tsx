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
import { useUsers } from "@/components/hooks/useUsers";

export const TableWrapper = () => {
  const { users, deleteUser } = useUsers();

  const columns = [
    { uid: 'username', name: 'Username' },
    { uid: 'email', name: 'Email' },
    { uid: 'role', name: 'Role' },
    { uid: 'actions', name: 'Actions' },
  ];

  return (
    <div className=" w-full flex flex-col gap-4">
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

        {users && users.length > 0 ? (
  <TableBody items={users || []}>
    {(item) => (
      <TableRow>
        {(columnKey) => (
          <TableCell>
            {RenderCell({ user: item, columnKey, deleteUser })}
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
