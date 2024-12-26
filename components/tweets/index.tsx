'use client';

import Link from "next/link";
import React, { useState } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { TemplatesIcon } from "../icons/sidebar/templates-icon";
import { PostTweetModal } from "./add-tweet";
import { useTweets } from "../hooks/useTweets";
import {
  Tabs,
  Tab,
  Button,
  Card,
  CardBody,
  Spinner,
  Chip,
} from "@nextui-org/react";

const DateFormatter = ({ date }: any) => {
  const formattedDate = new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Chicago',
    timeZoneName: 'short',
  });

  return <span className="text-xs text-gray-500">{formattedDate}</span>;
};

export const Tweets = () => {
  const {
    successfulTweets,
    failedTweets,
    loadMoreSuccessful,
    loadMoreFailed,
    hasMoreSuccessful,
    hasMoreFailed,
    reloadTweets,
    postTweet,
    retryAllFailedTweets,
    retryFailedTweet,
    resendSuccessfulTweet,
    isLoadingSuccessful,
    isLoadingFailed,
    isErrorSuccessful,
    isErrorFailed,
  } = useTweets();

  console.log('successfulTweetssuccessfulTweetssuccessfulTweetssuccessfulTweets',successfulTweets)

  const [selected, setSelected] = useState("successful");
  const [isPostTweetModalOpen, setIsPostTweetModalOpen] = useState(false);

  const openPostTweetModal = () => {
    setIsPostTweetModalOpen(true);
  };

  const closePostTweetModal = () => {
    setIsPostTweetModalOpen(false);
  };

  const handleRetryAllFailedTweets = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to retry all failed tweets?"
    );
    if (userConfirmed) {
      retryAllFailedTweets();
    }
  };

  const renderTweetList = (
    tweets: any,
    loadMore: any,
    hasMore: any,
    isLoading: any,
    isError: any,
    retryCallback?: (id: string) => Promise<void>
  ) => (
    <div className="flex flex-col gap-4">
      {
      tweets?.map((tweet: any) => (
        <div key={tweet.id} className="border-b pb-2 flex flex-col gap-2">
          <p>Content: {tweet.status}</p>
          <p> 
  {tweet.type === 'success' ? 
    <Chip color="success">Success</Chip> : 
    <Chip color="danger">Failed</Chip>
  }
</p>
          
          <DateFormatter date={tweet.createdAt} />
          {retryCallback && tweet.type !== 'success' && (
            <Button
              size="sm"
              color="primary"
              onPress={() => retryCallback(tweet.id)}
            >
              Retry
            </Button>
          )}
        </div>
      ))}
      {isError && <p className="text-red-500">Failed to load tweets.</p>}
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        hasMore && (
          <Button onClick={loadMore} fullWidth>
            Load More
          </Button>
        )
      )}
    </div>
  );

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <TemplatesIcon />
          <span>Templates</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Templates</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button
            color="primary"
            onPress={openPostTweetModal}
          >
            Post Tweet
          </Button>
          <Button
            color="warning"
            onPress={handleRetryAllFailedTweets}
          >
            Retry All Failed
          </Button>
          {/* <Button color="primary" onPress={reloadTweets}>
            Reload Tweets
          </Button> */}
        </div>
      </div>

      {isPostTweetModalOpen && (
        <PostTweetModal
          closeModal={closePostTweetModal}
          onPostTweet={postTweet}
        />
      )}

      <div className="max-w-[95rem] mx-auto w-full">
        <div className="flex flex-col w-full">
          <Card className="max-w-full">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                aria-label="Tweet Management Tabs"
                selectedKey={selected}
                size="md"
                onSelectionChange={setSelected as any}
              >
                <Tab key="successful" title="Successful Tweets">
                  {renderTweetList(
                    successfulTweets,
                    loadMoreSuccessful,
                    hasMoreSuccessful,
                    isLoadingSuccessful,
                    isErrorSuccessful,
                    resendSuccessfulTweet
                  )}
                </Tab>
                <Tab key="failed" title="Failed Tweets">
                  {renderTweetList(
                    failedTweets,
                    loadMoreFailed,
                    hasMoreFailed,
                    isLoadingFailed,
                    isErrorFailed,
                    retryFailedTweet
                  )}
                </Tab>
              </Tabs>
              <div className="flex justify-end mt-4 gap-4">
                {/* PostTweetModal is already rendered above */}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};