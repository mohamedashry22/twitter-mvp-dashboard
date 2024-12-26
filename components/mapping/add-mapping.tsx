import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useState, useMemo } from "react";
import { Formik } from "formik";
import { mappingSchema } from "@/helpers/schemas";
import { toast } from "react-toastify";
import { useMappings } from "../hooks/useMappings";
import { useWebhooks } from "../hooks/useWebhooks";
import { useTemplates } from "../hooks/useTemplates";

export const AddMapping = ({ mappingToUpdate, closeModal }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addMapping: saveMapping, updateMapping } = useMappings();
  const { webhooks } = useWebhooks();
  const { templates } = useTemplates();

  const isEditing = Boolean(mappingToUpdate);

  const initialValues = {
    webhookId: mappingToUpdate?.webhookId || "",
    templateId: mappingToUpdate?.templateId || "",
    mappingJson: mappingToUpdate?.mappingJson || "",
  };

  const [selectedWebhook, setSelectedWebhook] = useState(initialValues.webhookId || webhooks?.[0]?.id);
  const [selectedTemplate, setSelectedTemplate] = useState(initialValues.templateId || templates?.[0]?.id);

  const selectedWebhookValue = useMemo(() => selectedWebhook, [selectedWebhook]);
  const selectedTemplateValue = useMemo(() => selectedTemplate, [selectedTemplate]);

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
        let webhookIdValue = selectedWebhook;
        if (selectedWebhook instanceof Set) {
          webhookIdValue = selectedWebhook.values().next().value
        }

        let templateIdValue = selectedTemplate;
        if (selectedTemplate instanceof Set) {
          templateIdValue = selectedTemplate.values().next().value
        }

        const payload = {
          ...values,
          webhookId: webhookIdValue,
          templateId: templateIdValue,
        };

        if (isEditing) {
          await updateMapping.mutateAsync({
            id: mappingToUpdate.id,
            ...payload,
          });
          notify("Mapping updated successfully!", "success");
        } else {
          await saveMapping.mutateAsync(payload);
          notify("Mapping added successfully!", "success");
        }

        if (closeModal) {
          closeModal();
        } else {
          onOpenChange();
        }
      } catch (error) {
        console.error("Error during save operation:", error);
        notify(
          isEditing ? "Failed to update mapping!" : "Failed to add mapping!",
          "error"
        );
      }
    },
    [saveMapping, updateMapping, isEditing, mappingToUpdate, closeModal, onOpenChange, selectedWebhook, selectedTemplate]
  );

  return (
    <div>
      {!isEditing && (
        <Button onClick={onOpen} color="primary">
          Add Mapping
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
                {isEditing ? "Update Mapping" : "Add Mapping"}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={mappingSchema}
                  onSubmit={handleSave}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="capitalize"
                            variant="bordered"
                          >
                            {selectedWebhookValue || "Select Webhook"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Select a webhook"
                          disallowEmptySelection
                          selectedKeys={new Set([selectedWebhook])}
                          selectionMode="single"
                          onSelectionChange={setSelectedWebhook}
                        >
                          {webhooks.map((webhook) => (
                            <DropdownItem key={webhook.id}>
                              {webhook.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="capitalize"
                            variant="bordered"
                          >
                            {selectedTemplateValue || "Select Template"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Select a template"
                          disallowEmptySelection
                          selectedKeys={new Set([selectedTemplate])}
                          selectionMode="single"
                          onSelectionChange={setSelectedTemplate}
                        >
                          {templates.map((template: any) => (
                            <DropdownItem key={template.id}>
                              {template.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      <Textarea
                        variant="bordered"
                        label="Mapping JSON"
                        value={values.mappingJson}
                        isInvalid={!!errors.mappingJson && !!touched.mappingJson}
                        errorMessage={errors.mappingJson as string}
                        onChange={handleChange("mappingJson")}
                        rows={8}
                      />

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="flat"
                          onClick={() => {
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
                          {isEditing ? "Update Mapping" : "Add Mapping"}
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