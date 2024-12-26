import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../config/utils/api';

export const useConfigurations = () => {
  const queryClient = useQueryClient();

  const fetchConfigurations = async () => {
    const response = await api.get('/api/configuration');
    return response.data;
  };

  const {
    data: configurations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['configurations'],
    queryFn: fetchConfigurations,
  });

    // Add or Update configuration (single mutation for both actions)
    const saveConfiguration = useMutation({
      mutationFn: async (config: any) => {
        const response = await api.post(`/api/configuration`, config); 
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['configurations'] });
      },
    });

  const deleteConfiguration = useMutation({
    mutationFn: async (configId: string) => {
      return await api.delete(`/api/configuration/${configId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] });
    },
  });

  return {
    configurations,
    isLoading,
    isError,
    saveConfiguration,
    deleteConfiguration,
  };
};