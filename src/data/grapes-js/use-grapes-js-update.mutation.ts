import { UpdateGrapesJs } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import GrapesJs from "@repositories/grapes-js";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";

export interface IGrapesJsUpdateVariables {
  variables: {
    id: string;
    input: UpdateGrapesJs;
  };
}

export const useUpdateGrapesJsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IGrapesJsUpdateVariables) =>
      GrapesJs.update(`${API_ENDPOINTS.GRAPES_JS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.GRAPES_JS);
      },
    }
  );
};
