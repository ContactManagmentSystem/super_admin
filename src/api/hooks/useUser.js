import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  unactiveUser,
  editData,
  createData,
} from "../services/service";

export const useGetUser = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
export const useUnactiveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unactiveUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => editData("users", id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createData("users", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, password }) =>
      createData(`users/${id}`, { password }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
