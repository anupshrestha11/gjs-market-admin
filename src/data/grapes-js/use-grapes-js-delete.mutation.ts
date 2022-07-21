import { useMutation, useQueryClient } from "react-query";
import GrapesJs from "@repositories/grapes-js";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useDeleteGrapesJsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => GrapesJs.delete(`${API_ENDPOINTS.GRAPES_JS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.GRAPES_JS);
      },
    }
  );
};
