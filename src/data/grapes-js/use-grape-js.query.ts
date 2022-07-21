import GrapesJs from "@repositories/grapes-js";
import { useQuery } from "react-query";
import { Category as TCategory } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchGrapesJs = async (id: string) => {
    const { data } = await GrapesJs.find(`${API_ENDPOINTS.GRAPES_JS}/${id}`);
    return data;
};

export const useGrapeJsQuery = (id: string) => {
    return useQuery<TCategory, Error>([API_ENDPOINTS.GRAPES_JS, id], () =>
        fetchGrapesJs(id)
    );
};
