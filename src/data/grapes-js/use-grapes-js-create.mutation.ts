import { CreateGrapesJs } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import GrapesJs from "@repositories/grapes-js";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IGrapesJsCreateVariables {
  variables: { input: CreateGrapesJs };
}

export const useCreateGrapesJsMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IGrapesJsCreateVariables) =>
      GrapesJs.create(API_ENDPOINTS.GRAPES_JS, input),
    {
      onSuccess: () => {
        router.push(ROUTES.GRAPES_JS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.GRAPES_JS);
      },
    }
  );
};
