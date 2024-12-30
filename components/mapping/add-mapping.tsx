import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
  const [mappingValues, setMappingValues] = useState({});

  // Initialize selected items
  const [selectedWebhookId, setSelectedWebhookId] = useState<string>(
    mappingToUpdate?.webhookId ? String(mappingToUpdate?.webhookId) : ""
  );
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    mappingToUpdate?.templateId ? String(mappingToUpdate?.templateId) : ""
  );

  // Set initial values when webhooks and templates are loaded
  useEffect(() => {
    if (webhooks?.length && !selectedWebhookId) {
      const initialId = mappingToUpdate?.webhookId
        ? String(mappingToUpdate.webhookId)
        : String(webhooks[0]?.id);
      setSelectedWebhookId(initialId);
    }
  }, [webhooks, mappingToUpdate]);
  
  useEffect(() => {
    if (templates?.length && !selectedTemplateId) {
      const initialId = mappingToUpdate?.templateId
        ? String(mappingToUpdate.templateId)
        : String(templates[0]?.id);
      setSelectedTemplateId(initialId);
    }
  }, [templates, mappingToUpdate]);

  const initialValues = {
    webhookId: mappingToUpdate?.webhookId ? String(mappingToUpdate.webhookId) : "",
    templateId: mappingToUpdate?.templateId ? String(mappingToUpdate.templateId) : "",
    alert: mappingToUpdate?.alert || "",
    alertToken: mappingToUpdate?.alertToken || "",
    mappingJson: mappingToUpdate?.mappingJson || "",
  };


  // Get webhook name
  // const selectedWebhookName = useMemo(() => {
  //   const webhook = webhooks?.find(w => w.id === selectedWebhookId);
  //   return webhook?.name || "Select Webhook";
  // }, [webhooks, selectedWebhookId]);

  const selectedWebhookName = useMemo(() => {
    const webhook = webhooks?.find(w => String(w.id) === selectedWebhookId);
    return webhook?.name || "Select Webhook";
  }, [webhooks, selectedWebhookId]);
  
  const selectedTemplateName = useMemo(() => {
    const template = templates?.find((t: any) => String(t.id) === selectedTemplateId);
    return template?.name || "Select Template";
  }, [templates, selectedTemplateId]);

  const extractTokens = (text: string) => {
    const tokenRegex = /{{([^}]+)}}/g;
    const tokens: { [key: string]: string } = {};
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const fullToken = match[1];
      const parts = fullToken.split(".");
      const key = parts.length > 1 ? parts[parts.length - 1] : fullToken;
      tokens[key] = fullToken;
    }

    return tokens;
  };

  const generateMappingJson = (alertToken: string) => {
    const tokens = extractTokens(alertToken);
    const mappingJson = JSON.stringify(tokens, null, 2);
    return mappingJson;
  };

  const validationSchema = Yup.object().shape({
    webhookId: Yup.string().required("Webhook is required"),
    templateId: Yup.string().required("Template is required"),
    alert: Yup.string().required("Alert is required"),
    alertToken: Yup.string().required("Alert with tokens is required"),
    mappingJson: Yup.string().required("Mapping JSON is required"),
  });

  const notify = (message: string, type: "success" | "error" = "error") => {
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
        if (!selectedWebhookId || !selectedTemplateId) {
          notify("Please select both webhook and template");
          return;
        }

        const payload = {
          ...values,
          webhookId: selectedWebhookId,
          templateId: selectedTemplateId,
          mappingJson: values.mappingJson 
            ? values.mappingJson 
            : JSON.stringify(mappingValues),
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
      } catch (error: any) {
        console.error("Error during save operation:", error);
        notify(
          error.message || (isEditing ? "Failed to update mapping!" : "Failed to add mapping!"),
          "error"
        );
      }
    },
    [
      saveMapping,
      updateMapping,
      isEditing,
      mappingToUpdate,
      closeModal,
      onOpenChange,
      selectedWebhookId,
      selectedTemplateId,
      mappingValues,
    ]
  );

  return (
    <div>
    {!isEditing && (
      <Button onClick={onOpen} color="primary">
        Add Mapping
      </Button>
    )}

    <Modal
      isDismissable={false}
      scrollBehavior="inside"
      isOpen={isEditing ? true : isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen && closeModal) {
          closeModal();
        } else {
          onOpenChange();
        }
      }}
      placement="top-center"
      size="2xl"
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
                validationSchema={validationSchema}
                onSubmit={handleSave}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFieldValue('webhookId', selectedWebhookId);
                      setFieldValue('templateId', selectedTemplateId);
                      handleSubmit(e);
                    }}
                  >
                   <div className="flex items-center gap-4">
  {/* Webhook Label */}
  <span className="font-medium">Webhook:</span>

  {/* Dropdown */}
  <Dropdown>
    <DropdownTrigger>
      <Button className="w-full justify-start" variant="bordered">
        {selectedWebhookName || "Select Webhook"}
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Select a webhook"
      selectionMode="single"
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        if (selected) {
          setSelectedWebhookId(String(selected));
          setFieldValue("webhookId", String(selected));
        }
      }}
    >
      {webhooks?.map((webhook) => (
        <DropdownItem key={webhook.id}>{webhook.name}</DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
</div>

<div className="flex items-center gap-4">
  {/* Webhook Label */}
  <span className="font-medium">Template:</span>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          className="w-full justify-start" 
                          variant="bordered"
                        >
                          {selectedTemplateName}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Select a template"
                        selectionMode="single"
                        selectedKeys={selectedTemplateId ? [selectedTemplateId] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0];
                          if (selected) {
                            setSelectedTemplateId(String(selected));
                            setFieldValue("templateId", String(selected));
                          }
                        }}
                      >
                        {templates?.map((template: any) => (
                          <DropdownItem key={String(template.id)}>
                            {template.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
</div>
                    {/* Rest of the form components (Textarea, etc.) remain the same */}
                    <Textarea
                      variant="bordered"
                      label="Alert"
                      value={values.alert}
                      isInvalid={!!errors.alert && !!touched.alert}
                      errorMessage={errors.alert as string}
                      onChange={handleChange("alert")}
                      placeholder="Enter alert text..."
                      rows={4}
                    />

                    <Textarea
                      variant="bordered"
                      label="Alert with Tokens"
                      value={values.alertToken}
                      isInvalid={!!errors.alertToken && !!touched.alertToken}
                      errorMessage={errors.alertToken as string}
                      onChange={(e) => {
                        handleChange("alertToken")(e);
                        const mappingJson = generateMappingJson(e.target.value);
                        setFieldValue("mappingJson", mappingJson);
                        setMappingValues(JSON.parse(mappingJson));
                      }}
                      placeholder="Enter alert text with tokens..."
                      rows={4}
                    />

                    <Textarea
                      variant="bordered"
                      label="Mapping JSON"
                      value={values.mappingJson}
                      rows={4}
                      isReadOnly
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

                      <Button color="primary" variant="flat" type="submit">
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