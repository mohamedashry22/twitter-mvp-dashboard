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
import { useUsers } from "@/components/hooks/useUsers";

export const TableWrapper = () => {
  const { users, deleteUser } = useUsers();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const columns = [
    { uid: 'username', name: 'Username' },
    { uid: 'email', name: 'Email' },
    { uid: 'role', name: 'Role' },
    { uid: 'actions', name: 'Actions' },
  ];

  const pages = Math.ceil((users?.length || 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users?.slice(start, end) || [];
  }, [page, users]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table 
        aria-label="Users table with pagination"
        bottomContent={
          users?.length > 0 ? (
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

        {users && users.length > 0 ? (
          <TableBody items={items}>
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