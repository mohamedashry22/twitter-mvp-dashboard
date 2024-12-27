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
  const handleSave = useCallback(
    async (values: { status: string }) => {
      try {
        await onPostTweet(values.status);
        toast.success("Tweet posted successfully!");
        closeModal();
      } catch (error) {
        toast.error("Failed to post tweet!");
        closeModal();
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
                initialValues={{ status: "" }}
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
                  <form onSubmit={handleSubmit}>
                    <Input
                      variant="bordered"
                      label="Tweet Content"
                      placeholder="What's happening?"
                      value={values.status}
                      isInvalid={!!errors.status && !!touched.status}
                      errorMessage={errors.status}
                      onChange={handleChange("status")}
                    />
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={closeModal}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
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
