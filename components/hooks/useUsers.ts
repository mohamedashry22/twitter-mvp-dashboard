'use client'

import { api } from '@/config/utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const response = await api.get('/api/users');
    if (response && response.data) {
      return response.data; // Ensure response has the expected data
    }
    return []; // Return an empty array if response is invalid
  };

  // Default users to an empty array to prevent undefined errors
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  const addUser = useMutation({
    mutationFn: async (newUser: any) => {
      const response = await api.post('/api/auth/signup', newUser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // queryClient.refetchQueries({ queryKey: ['users'] });
    },
  });

  const updateUser = useMutation({
    mutationFn: async (updatedUser: any) => {
      const response = await api.put(`/api/users/${updatedUser.id}`, updatedUser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // queryClient.refetchQueries({ queryKey: ['users'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.delete(`/api/users/${userId}`);
      if (!response.status || response.status !== 200) {
        throw new Error("Failed to delete user");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // queryClient.refetchQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error("Delete mutation failed:", error);
    },
  });

  return {
    users, 
    isLoading,
    isError,
    addUser,
    updateUser,
    deleteUser,
  };
};
