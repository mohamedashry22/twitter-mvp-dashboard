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
import { TemplateSchema } from "@/helpers/schemas";
import { toast } from "react-toastify";
import { useTemplates } from "../hooks/useTemplates";

export const AddTemplate = ({ templateToUpdate, closeModal }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addTemplate, updateTemplate } = useTemplates();

  const isEditing = Boolean(templateToUpdate);

  const initialValues = {
    name: templateToUpdate?.name || "",
    content: templateToUpdate?.content || "",
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
        const user = localStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;

        if (isEditing) {
          await updateTemplate.mutateAsync({
            id: templateToUpdate.id,
            name: values.name,
            content: values.content,
            userId: parsedUser?.id,
          });
          notify("Template updated successfully!", "success");
        } else {
          await addTemplate.mutateAsync({
            name: values.name,
            content: values.content,
            userId: parsedUser?.id,
          });
          notify("Template added successfully!", "success");
        }

        if (closeModal) {
          closeModal();
        } else {
          onOpenChange();
        }
      } catch (error) {
        console.error("Error during save operation:", error);
        notify(
          isEditing ? "Failed to update template!" : "Failed to add template!",
          "error"
        );
      }
    },
    [addTemplate, updateTemplate, isEditing, templateToUpdate, closeModal, onOpenChange]
  );

  return (
    <div>
      {!isEditing && (
        <Button onPress={onOpen} color="primary">
          Add Template
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
                {isEditing ? "Update Template" : "Add Template"}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={TemplateSchema}
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
                        label="Content"
                        value={values.content}
                        isInvalid={!!errors.content && !!touched.content}
                        errorMessage={errors.content as string}
                        onChange={handleChange("content")}
                        rows={8}
                        size="lg"
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
                          {isEditing ? "Update Template" : "Add Template"}
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