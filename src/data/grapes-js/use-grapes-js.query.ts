import {
  QueryParamsType,
  GrapesJsQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import GrapesJs from "@repositories/grapes-js";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { GrapesJsPaginator } from "@ts-types/generated";

const fetchGrapesJs = async ({
  queryKey,
}: QueryParamsType): Promise<{ grapesJs: GrapesJsPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
    parent,
  } = params as GrapesJsQueryOptionsType;

  const searchString = stringifySearchQuery({
    version: text,
    type,
  });
  // @ts-ignore
  const queryParams = new URLSearchParams({
    searchJoin: "and",
    orderBy,
    sortedBy,
    ...(typeof parent === undefined ? {} : { parent }),
    limit: limit.toString(),
    ...(page && { page: page.toString() }),
    ...(Boolean(searchString) && { search: searchString }),
  });
  const url = `${API_ENDPOINTS.GRAPES_JS}?${queryParams.toString()}`;
  const {
    data: { data, ...rest },
  } = await GrapesJs.all(url);
  return {
    grapesJs: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useGrapesJsQuery = (options: GrapesJsQueryOptionsType) => {
  return useQuery<{ grapesJs: GrapesJsPaginator }, Error>(
    [API_ENDPOINTS.GRAPES_JS, options],
    fetchGrapesJs,
    {
      keepPreviousData: true,
    }
  );
};

export { useGrapesJsQuery, fetchGrapesJs };
