"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { Formik } from "formik";
import { webhookSchema } from "@/helpers/schemas";
import { toast } from "react-toastify";
import { useWebhooks } from "../hooks/useWebhooks";

export const AddWebhook = ({ webhookToUpdate, closeModal }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addWebhook, updateWebhook } = useWebhooks();

  const isEditing = Boolean(webhookToUpdate);

  const initialValues = {
    name: webhookToUpdate?.name || "",
    description: webhookToUpdate?.description || "",
  };

  const notify = (message: any, type = "error") => {
    const toastFn = type === "success" ? toast.success : toast.error;
    toastFn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSave = useCallback(
    async (values: any) => {
      try {
        if (isEditing) {
          await updateWebhook.mutateAsync({
            id: webhookToUpdate.id,
            name: values.name,
            description: values.description,
          });
          notify("Webhook updated successfully!", "success");
        } else {
          await addWebhook.mutateAsync({
            name: values.name,
            description: values.description,
          });
          notify("Webhook added successfully!", "success");
        }

        if (closeModal) {
          closeModal();
        } else {
          onOpenChange();
        }
      } catch (error) {
        console.error("Error during save operation:", error);
        notify(
          isEditing ? "Failed to update Webhook!" : "Failed to add Webhook!",
          "error"
        );
      }
    },
    [addWebhook, updateWebhook, isEditing, webhookToUpdate, closeModal, onOpenChange]
  );

  return (
    <div>
      {!isEditing && (
        <Button onPress={onOpen} color="primary">
          Add Webhook
        </Button>
      )}

      <Modal
        isOpen={isEditing ? true : isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen && closeModal) {
            closeModal();
          } else {
            onOpenChange();
          }
        }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? "Update Webhook" : "Add Webhook"}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={webhookSchema}
                  onSubmit={handleSave}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form className="flex flex-col w gap-4 mb-4" onSubmit={handleSubmit}>
                      <Input
                        variant="bordered"
                        label="Name"
                        value={values.name}
                        isInvalid={!!errors.name && !!touched.name}
                        errorMessage={errors.name as string}
                        onChange={handleChange("name")}
                      />
                      <Textarea
                        variant="bordered"
                        label="Description"
                        value={values.description}
                        isInvalid={!!errors.description && !!touched.description}
                        errorMessage={errors.description as string}
                        onChange={handleChange("description")}
                      />

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={() => {
                            if (closeModal) {
                              closeModal();
                            } else {
                              onOpenChange();
                            }
                          }}
                        >
                          Close
                        </Button>

                        <Button
                          color="primary"
                          variant="flat"
                          type="submit"
                        >
                          {isEditing ? "Update Webhook" : "Add Webhook"}
                        </Button>
                      </ModalFooter>
                    </form>
                  )}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
