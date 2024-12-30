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
import { ConfigurationSchema } from "@/helpers/schemas";
import { toast } from "react-toastify";
import { useConfigurations } from "../hooks/useConfigurations";

export const AddConfiguration = ({ configurationToUpdate, closeModal }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { saveConfiguration } = useConfigurations();

  const isEditing = Boolean(configurationToUpdate);

  const initialValues = {
    key: configurationToUpdate?.key || "",
    value: configurationToUpdate?.value || "",
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
        // const user = localStorage.getItem("user");
        // const parsedUser = user ? JSON.parse(user) : null;

        if (isEditing) {
          await saveConfiguration.mutateAsync({
            id: configurationToUpdate.id,
            key: values.key,
            value: values.value
          });
          notify("Configuration updated successfully!", "success");
        } else {
          await saveConfiguration.mutateAsync({
            key: values.key,
            value: values.value,
          });
          notify("Configuration added successfully!", "success");
        }

        if (closeModal) {
          closeModal();
        } else {
          onOpenChange();
        }
      } catch (error) {
        console.error("Error during save operation:", error);
        notify(
          isEditing ? "Failed to update Configuration!" : "Failed to add Configuration!",
          "error"
        );
      }
    },
    [saveConfiguration, isEditing, configurationToUpdate, closeModal, onOpenChange]
  );

  return (
    <div>
      {!isEditing && (
        <Button onPress={onOpen} color="primary">
          Add Configuration
        </Button>
      )}

      <Modal 
      isDismissable={false}
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
                {isEditing ? "Update Configuration" : "Add Configuration"}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={ConfigurationSchema}
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
                        label="Key"
                        value={values.key}
                        isInvalid={!!errors.key && !!touched.key}
                        errorMessage={errors.key as string}
                        onChange={handleChange("key")}
                      />
                      <Textarea
                        variant="bordered"
                        label="Value"
                        value={values.value}
                        isInvalid={!!errors.value && !!touched.value}
                        errorMessage={errors.value as string}
                        onChange={handleChange("value")}
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
                          {isEditing ? "Update Configuration" : "Add Configuration"}
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