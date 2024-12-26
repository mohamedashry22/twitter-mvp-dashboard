import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { toast } from "react-toastify";
import { AddConfiguration } from "@/components/configurations/add-configuration";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";

export const RenderCell = ({
  configuration,
  columnKey,
  deleteConfiguration,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [configurationToEdit, setConfigurationToEdit] = useState(null);

  const notifySuccess = () =>
    toast.success("Configuration deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Error deleting Configuration!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = async (configuration: any) => {
    if (window.confirm("Are you sure you want to delete " + configuration.key + " ?")) {
      debugger;
      await deleteConfiguration.mutate(configuration.id, {
        onSuccess: () => {
          notifySuccess();
        },
        onError: (error: any) => {
          notifyError();
        },
      });
    }
  };

  const handleUpdate = (configuration: any) => {
    setConfigurationToEdit(configuration);
    setIsEditing(true);
  };

  const handleView = (configuration: any) => {
    setConfigurationToEdit(configuration);
    setIsViewing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsViewing(false);
    setConfigurationToEdit(null);
  };

  if (!configuration) {
    console.error('Configuration object is undefined');
    return null; // Render nothing or a fallback UI
  }

  const cellValue = configuration[columnKey];
  switch (columnKey) {
    case "key":
    case "value":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          {/* <div>
            <span>{configuration.team}</span>
          </div> */}
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 justify-end">
          <div className="flex justify-end items-center gap-4">
      <div>
        <Tooltip content="View Configuration" color="primary">
          <button onClick={() => handleView(configuration)}>
            <ViewIcon />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Update Configuration" color="success">
          <button onClick={() => handleUpdate(configuration)}>
            <EditIcon size={20} fill="#00C853" />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Delete Configuration" color="danger">
          <button onClick={() => handleDelete(configuration)}>
            <DeleteIcon size={20} fill="#FF0080" />
          </button>
        </Tooltip>
      </div>
    </div>

          {/* View Modal */}
          {isViewing && configurationToEdit && (
            <Modal isOpen={isViewing} onOpenChange={closeModal} placement="top-center">
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  View Configuration
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>Key:</strong> {(configurationToEdit as any).key}
                    </p>
                    <p >
                      <strong>Value:</strong>
                    </p>
                    <p className="break-words">{(configurationToEdit as any).value}</p>
                  </div>
                </ModalBody>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={closeModal}
                  className="mt-4"
                >
                  Close
                </Button>
              </ModalContent>
            </Modal>
          )}

          {/* Edit Modal */}
          {isEditing && configurationToEdit && (
            <AddConfiguration configurationToUpdate={configurationToEdit} closeModal={closeModal} />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};