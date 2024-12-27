import { User, Tooltip, Chip, useUser } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { toast, ToastContainer } from "react-toastify";


export const RenderCell = ({ user, columnKey, deleteUser }: any) => {

  const notifySuccess = () => toast.success('User deleted successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

   const notify = () => toast.error('Error deleting user!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });



    const handleDelete = async (user:any) => {
      if (window.confirm('Are you sure you want to delete ' + user.username + ' ?')) {
        await deleteUser.mutate(user.id , {
          onSuccess: () => {
            notifySuccess();
          },
          onError: (error: any) => {
            notify();
          },
        });
      }
    };

    

    
  // @ts-a
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{user.team}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 justify-end">
          <div>
            <Tooltip content="Delete user" color="danger">
                      <button onClick={() => handleDelete(user)}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </button>
                    </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
