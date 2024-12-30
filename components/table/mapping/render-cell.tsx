import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { toast } from "react-toastify";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { AddMapping } from "@/components/mapping/add-mapping";

export const RenderCell = ({
  mapping,
  columnKey,
  deleteMapping,
  webhooks,
  templates,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [mappingToEdit, setMappingToEdit] = useState(null);

  const notifySuccess = () =>
    toast.success("Mapping deleted successfully!", {
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
    toast.error("Error deleting mapping!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = async (mapping: any) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      await deleteMapping.mutate(mapping.id, {
        onSuccess: () => {
          notifySuccess();
        },
        onError: () => {
          notifyError();
        },
      });
    }
  };

  const handleUpdate = (mapping: any) => {
    setMappingToEdit(mapping);
    setIsEditing(true);
  };

  const handleView = (mapping: any) => {
    setMappingToEdit(mapping);
    setIsViewing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsViewing(false);
    setMappingToEdit(null);
  };

  // Get the webhook and template names based on their IDs
  const webhook = webhooks?.find((w: any) => w.id === mapping.webhookId);
  const template = templates?.find((t: any) => t.id === mapping.templateId);

  const cellValue = mapping[columnKey];
  switch (columnKey) {
    case "webhookId":
      return <span>{webhook ? webhook.name : "N/A"}</span>;

    case "templateId":
      return <span>{template ? template.name : "N/A"}</span>;

    case "mappingJson":
      return (
        <Tooltip content="View JSON">
          <button onClick={() => handleView(mapping)}>
            <ViewIcon />
          </button>
        </Tooltip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 justify-end">
          <Tooltip content="View Mapping" color="primary">
            <button onClick={() => handleView(mapping)}>
              <ViewIcon />
            </button>
          </Tooltip>
          <Tooltip content="Update Mapping" color="success">
            <button onClick={() => handleUpdate(mapping)}>
              <EditIcon size={20} fill="#00C853" />
            </button>
          </Tooltip>
          <Tooltip content="Delete Mapping" color="danger">
            <button onClick={() => handleDelete(mapping)}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>

          {/* View Modal */}
          {isViewing && mappingToEdit && (
            <Modal isDismissable={false} isOpen={isViewing} onOpenChange={closeModal}>
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  View Mapping
                </ModalHeader>
                <ModalBody>
                  
                  <p><strong>Webhook:</strong> {webhook?.name}</p>
                  <p><strong>Template:</strong> {template?.name}</p>
                  <p><strong>Alert:</strong> {(mappingToEdit as any)?.alert}</p>
                  <p><strong>Alert With Tokens:</strong> {(mappingToEdit as any)?.alertToken}</p>
                  <strong>Mapping JSON:</strong>
                  <pre className="whitespace-pre-wrap break-words p-1 rounded-md">

  {(() => {
    try {
      const formattedJson = 
        JSON.parse((mappingToEdit as any).mappingJson)
      return formattedJson;
    } catch (error) {
      return "Invalid JSON format!";
    }
  })()}
</pre>                 
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
          {isEditing && mappingToEdit && (
            <AddMapping mappingToUpdate={mappingToEdit} closeModal={closeModal} />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};
