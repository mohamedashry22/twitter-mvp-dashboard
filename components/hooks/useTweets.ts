'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '../../config/utils/api';

export interface Tweet {
  id: string;
  status: string;
  createdAt: string;
}

interface FetchTweetsResponse {
  tweets: Tweet[];
  hasMore: boolean;
}

export const useTweets = () => {
  const queryClient = useQueryClient();
  const PAGE_SIZE = 1;

  const [successfulTweets, setSuccessfulTweets] = useState<Tweet[]>([]);
  const [failedTweets, setFailedTweets] = useState<Tweet[]>([]);
  const [successfulPage, setSuccessfulPage] = useState(1);
  const [failedPage, setFailedPage] = useState(1);

  const fetchSuccessfulTweets = async (page: number): Promise<FetchTweetsResponse> => {
    const response = await api.get('/api/twitter/successful-tweets', {
      params: { page, limit: PAGE_SIZE },
    });
    return response.data;
  };

  const fetchFailedTweets = async (page: number): Promise<FetchTweetsResponse> => {
    const response = await api.get('/api/twitter/failed-tweets', {
      params: { page, limit: PAGE_SIZE },
    });
    return response.data;
  };

  const {
    data: successfulData,
    isLoading: isLoadingSuccessful,
    isError: isErrorSuccessful,
    isFetching: isFetchingSuccessful,
  } = useQuery({
    queryKey: ['successfulTweets', successfulPage],
    queryFn: () => fetchSuccessfulTweets(successfulPage),
    staleTime: 5000,
  });

  const {
    data: failedData,
    isLoading: isLoadingFailed,
    isError: isErrorFailed,
    isFetching: isFetchingFailed,
  } = useQuery({
    queryKey: ['failedTweets', failedPage],
    queryFn: () => fetchFailedTweets(failedPage),
    staleTime: 5000,
  });

  useEffect(() => {
    if (successfulData && Array.isArray(successfulData)) {
      setSuccessfulTweets((prev) => [...prev, ...successfulData]);
    } else {
      console.error("successfulData.tweets is not valid:", successfulData);
    }
  }, [successfulData]);

  useEffect(() => {
    if (failedData && Array.isArray(failedData)) {
      setFailedTweets((prev) => [...prev, ...failedData]);
    } else {
      console.error("failedData.tweets is not valid:", failedData);
    }
  }, [failedData]);

  const loadMoreSuccessful = () => {
    if (successfulData?.hasMore) {
      setSuccessfulPage((prev) => prev + 1);
    }
  };

  const loadMoreFailed = () => {
    if (failedData?.hasMore) {
      setFailedPage((prev) => prev + 1);
    }
  };

  const reloadTweets = () => {
    queryClient.invalidateQueries({ queryKey: ['successfulTweets'] });
    queryClient.invalidateQueries({ queryKey: ['failedTweets'] });
    setSuccessfulTweets([]);
    setFailedTweets([]);
    setSuccessfulPage(1);
    setFailedPage(1);
  };

  const postTweet = async (status: string) => {
    const response = await api.post('/api/twitter/tweet', { status });
    return response.data;
  };

  const retryAllFailedTweets = async () => {
    const response = await api.post('/api/twitter/retry-failed-tweets');
    return response.data;
  };

  const retryFailedTweet = async (logId: string) => {
    const response = await api.post(`/api/twitter/retry-failed-tweet/${logId}`);
    return response.data;
  };

  const resendSuccessfulTweet = async (logId: string) => {
    const response = await api.post(`/api/twitter/resend-successful-tweet/${logId}`);
    return response.data;
  };

  const hasMoreSuccessful = successfulData?.hasMore || false;
  const hasMoreFailed = failedData?.hasMore || false;

  return {
    successfulTweets,
    failedTweets,
    loadMoreSuccessful,
    loadMoreFailed,
    hasMoreSuccessful,
    hasMoreFailed,
    reloadTweets,
    isLoadingSuccessful,
    isLoadingFailed,
    isErrorSuccessful,
    isErrorFailed,
    postTweet,
    retryAllFailedTweets,
    retryFailedTweet,
    resendSuccessfulTweet,
    isFetchingSuccessful,
    isFetchingFailed,
  };
};