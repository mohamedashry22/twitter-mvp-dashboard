'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/utils/api';

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

  const fetchSuccessfulTweets = async () => {
    const response = await api.get('/api/twitter/successful-tweets');
    return response.data;
  };

  const {
    data: successfulTweets,
      isLoading: isSuccessfulLoading,
      isError: isSuccessfulError,
  } = useQuery({
    queryKey: ['successfulTweets'],
    queryFn: fetchSuccessfulTweets,
  });

  const fetchFailedTweets = async () => {
    const response = await api.get('/api/twitter/failed-tweets');
    return response.data;
  };

  const {
    data: failedTweets,
      isLoading: isFailedLoading,
      isError:isFailedError,
  } = useQuery({
    queryKey: ['failedTweets'],
    queryFn: fetchFailedTweets,
  });


  const reloadTweets = () => {
    queryClient.invalidateQueries({ queryKey: ['successfulTweets'] });
    queryClient.invalidateQueries({ queryKey: ['failedTweets'] });
  };

  const postTweet = useMutation({
    mutationFn: async (status: any) => {
      const response = await api.post('/api/twitter/tweet', { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['successfulTweets'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['failedTweets'] });
    }
  });

  const retryAllFailedTweets = useMutation({
    mutationFn: async () => {
      const response = await api.post('/api/twitter/retry-failed-tweets');
      return response.data;
    },
    onSuccess: () => {
      reloadTweets();
    }
  });

  const retryFailedTweet = useMutation({
    mutationFn: async (logId) => {
      const response = await api.post(`/api/twitter/retry-failed-tweet/${logId}`);
      return response.data;
    },
    onSuccess: () => {
      reloadTweets();
    }
  });

  // const retryAllFailedTweets = async () => {
  //   const response = await api.post('/api/twitter/retry-failed-tweets');
  //   return response.data;
  // };

  // const retryFailedTweet = async (logId: string) => {
  //   const response = await api.post(`/api/twitter/retry-failed-tweet/${logId}`);
  //   return response.data;
  // };

  // const resendSuccessfulTweet = async (logId: string) => {
  //   const response = await api.post(`/api/twitter/resend-successful-tweet/${logId}`);
  //   return response.data;
  // };


  return {
    successfulTweets,
    failedTweets,
    reloadTweets,
    isFailedLoading,
    isFailedError,
    isSuccessfulLoading,
    isSuccessfulError,
    postTweet,
    retryAllFailedTweets,
    retryFailedTweet,
  };
};