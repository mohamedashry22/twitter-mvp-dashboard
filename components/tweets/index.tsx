'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { TemplatesIcon } from "../icons/sidebar/templates-icon";
import { PostTweetModal } from "./add-tweet";
import { useTweets } from "../hooks/useTweets";
import { TableWrapper } from "../table/tweets/table";
import { toast } from "react-toastify";

export const Tweets = () => {
  const [selected, setSelected] = useState("successful");
  const [isPostTweetModalOpen, setIsPostTweetModalOpen] = useState(false);
  const {
    successfulTweets,
    failedTweets,
    postTweet,
    retryAllFailedTweets,
    isSuccessfulLoading,
    isFailedLoading,
  } = useTweets();

  const handleRetryAllFailedTweets = async () => {
    if (window.confirm("Are you sure you want to retry all failed tweets?")) {
      try {
        await retryAllFailedTweets.mutateAsync();
        toast.success("All failed tweets have been retried successfully");
      } catch (error) {
        toast.error("Failed to retry tweets. Please try again.");
      }
    }
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href="/">Home</Link>
          <span>/</span>
        </li>
        <li className="flex gap-2">
          <TemplatesIcon />
          <span>Tweets</span>
          <span>/</span>
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Tweet Management</h3>
      
      <div className="flex justify-end gap-3.5">
        <Button color="primary" onPress={() => setIsPostTweetModalOpen(true)}>
          Post Tweet
        </Button>

        <Button
  isDisabled={(retryAllFailedTweets as any).isLoading  || ( failedTweets && failedTweets.length == 0)}
  onClick={handleRetryAllFailedTweets}
>
  Retry All Failed
</Button>
      </div>

      {isPostTweetModalOpen && (
        <PostTweetModal
          closeModal={() => setIsPostTweetModalOpen(false)}
          onPostTweet={postTweet.mutateAsync}
        />
      )}

      <Card className="max-w-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tweet tabs"
            selectedKey={selected}
            onSelectionChange={setSelected as any}
          >
            <Tab key="successful" title="Successful Tweets">
              <TableWrapper
                tweets={successfulTweets}
                isLoading={isSuccessfulLoading}
                type="success"
              />
            </Tab>
            <Tab key="failed" title="Failed Tweets">
              <TableWrapper
                tweets={failedTweets}
                isLoading={isFailedLoading}
                type="failed"
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};