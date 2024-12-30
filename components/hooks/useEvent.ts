import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/utils/api';

export const useEvent = () => {
  const queryClient = useQueryClient();

  const fetchEvents = async () => {
    const response = await api.get('/api/eventData');
    return response.data;
  };

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const postEvent = useMutation({
    mutationFn: async (webhookUrl: any) => {
      debugger;
      const response = await api.post('/api/event/'+ webhookUrl);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });


  return {
    events,
    isLoading,
    isError,
    postEvent,
  };
};
