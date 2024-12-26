'use client';

import React, { useCallback } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface PostTweetModalProps {
  closeModal: () => void; 
  onPostTweet: (status: string) => Promise<void>;
}

const TweetSchema = Yup.object().shape({
  status: Yup.string()
    .max(280, "Tweet must be 280 characters or less.")
    .required("Tweet content is required."),
});

export const PostTweetModal = ({ closeModal, onPostTweet }: PostTweetModalProps) => {
  const initialValues = {
    status: "",
  };

  const notify = (message: string, type = "error") => {
    const toastFn = type === "success" ? toast.success : toast.error;
    toastFn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSave = useCallback(
    async (values: { status: string }) => {
      try {
        await onPostTweet(values.status);
        notify("Tweet posted successfully!", "success");
        closeModal();
      } catch (error) {
        console.error("Error posting tweet:", error);
        notify("Failed to post tweet!");
      }
    },
    [onPostTweet, closeModal]
  );

  return (
    <Modal isOpen={true} onOpenChange={closeModal} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Post a New Tweet</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                validationSchema={TweetSchema}
                onSubmit={handleSave}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
                    <Input
                      variant="bordered"
                      label="Tweet Content"
                      placeholder="What's happening?"
                      value={values.status}
                      isInvalid={!!errors.status && !!touched.status}
                      errorMessage={errors.status as string}
                      onChange={handleChange("status")}
                    />
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          closeModal();
                          onClose();
                        }}
                      >
                        Close
                      </Button>
                      <Button color="primary" variant="flat" type="submit">
                        Post Tweet
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
  );
};