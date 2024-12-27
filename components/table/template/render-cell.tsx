import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { toast } from "react-toastify";
import { AddTemplate } from "@/components/templates/add-template";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import CopyButton from "@/components/copy";

export const RenderCell = ({
  template,
  columnKey,
  deleteTemplate,
  updateTemplate,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);


  const copyToClipboard = async (content: any) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset the success message after 2 seconds
    } catch (err) {
      setCopySuccess(false);
      console.error('Failed to copy: ', err);
    }
  };

  const notifySuccess = () =>
    toast.success("Template deleted successfully!", {
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
    toast.error("Error deleting template!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = async (template: any) => {
    if (window.confirm("Are you sure you want to delete " + template.name + " ?")) {
      await deleteTemplate.mutate(template.id, {
        onSuccess: () => {
          notifySuccess();
        },
        onError: (error: any) => {
          notifyError();
        },
      });
    }
  };

  const handleUpdate = (template: any) => {
    setTemplateToEdit(template);
    setIsEditing(true);
  };

  const handleView = (template: any) => {
    setTemplateToEdit(template);
    setIsViewing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsViewing(false);
    setTemplateToEdit(null);
  };

  const cellValue = template[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{template.team}</span>
          </div>
        </div>
      );
     
    case "actions":
      return (
        <div className="flex items-center gap-4 justify-end">
          <div className="flex justify-end items-center gap-4">
      <div>
        <Tooltip content="View Template" color="primary">
          <button onClick={() => handleView(template)}>
            <ViewIcon />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Update Template" color="success">
          <button onClick={() => handleUpdate(template)}>
            <EditIcon size={20} fill="#00C853" />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Delete Template" color="danger">
          <button onClick={() => handleDelete(template)}>
            <DeleteIcon size={20} fill="#FF0080" />
          </button>
        </Tooltip>
      </div>
    </div>

          {/* View Modal */}
          {isViewing && templateToEdit && (
            <Modal isOpen={isViewing} onOpenChange={closeModal} placement="top-center">
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  View Template
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>Name:</strong> {(templateToEdit as any).name}
                    </p>
                    <p>
                      <strong>Content:</strong>
                    </p>
                    <p className="break-words">{(templateToEdit as any).content}</p>
                    {/* <button>press here to copy the value of {(templateToEdit as any).content}</button> */}
                    <CopyButton content={(templateToEdit as any).content} />
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
          {isEditing && templateToEdit && (
            <AddTemplate templateToUpdate={templateToEdit} closeModal={closeModal} />
          )}
        </div>
      );
    default:
      return cellValue;
  }
};