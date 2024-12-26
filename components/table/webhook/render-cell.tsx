import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { toast } from "react-toastify";
import { AddWebhook } from "@/components/webhooks/add-webhook";
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
  webhook,
  columnKey,
  deleteWebhook,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [webhookToEdit, setWebhookToEdit] = useState(null);

  const notifySuccess = () =>
    toast.success("Webhook deleted successfully!", {
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
    toast.error("Error deleting Webhook!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = async (webhook: any) => {
    if (window.confirm("Are you sure you want to delete " + webhook.name + " ?")) {
      debugger;
      await deleteWebhook.mutate(webhook.id, {
        onSuccess: () => {
          notifySuccess();
        },
        onError: (error: any) => {
          notifyError();
        },
      });
    }
  };

  const handleUpdate = (webhook: any) => {
    setWebhookToEdit(webhook);
    setIsEditing(true);
  };

  const handleView = (webhook: any) => {
    setWebhookToEdit(webhook);
    setIsViewing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsViewing(false);
    setWebhookToEdit(null);
  };

  if (!webhook) {
    console.error('Webhook object is undefined');
    return null; // Render nothing or a fallback UI
  }

  const cellValue = webhook[columnKey];
  switch (columnKey) {
    case "name":
    case "description":
      return (
        <div>
          <span>{cellValue}</span>
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 justify-end">
          <div className="flex justify-end items-center gap-4">
            <div>
              <Tooltip content="View Webhook" color="primary">
                <button onClick={() => handleView(webhook)}>
                  <ViewIcon />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Update Webhook" color="success">
                <button onClick={() => handleUpdate(webhook)}>
                  <EditIcon size={20} fill="#00C853" />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Delete Webhook" color="danger">
                <button onClick={() => handleDelete(webhook)}>
                  <DeleteIcon size={20} fill="#FF0080" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* View Modal */}
          {isViewing && webhookToEdit && (
            <Modal isOpen={isViewing} onOpenChange={closeModal} placement="top-center">
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  View Webhook
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>Name:</strong> {(webhookToEdit as any).name}
                    </p>
                    <p>
                      <strong>Webhook Url:</strong>
                    </p>
                    <p className="break-words">{(webhookToEdit as any).endpointUrl}</p>
                    <p>
                      <strong>Description:</strong>
                    </p>
                    <p className="break-words">{(webhookToEdit as any).description}</p>
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
          {isEditing && webhookToEdit && (
            <AddWebhook webhookToUpdate={webhookToEdit} closeModal={closeModal} />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};
