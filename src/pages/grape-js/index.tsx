import GrapeJsList from "@components/grapes-js/grapes-js-list";
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useGrapesJsQuery } from "@data/grapes-js/use-grapes-js.query";
import { adminOnly } from "@utils/auth-utils";

export default function GrapesJS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useGrapesJsQuery({
    limit: 20,
    page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
    parent: null,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="mb-4 md:w-1/4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading">
              {/* {t("form:input-label-categories")} */}
              GrapesJS
            </h1>
          </div>

          <div className="flex flex-col items-center w-full space-y-4 xl:w-1/2 md:flex-row md:space-y-0 ms-auto">
            <Search onSearch={handleSearch} />

            {/* <TypeFilter
              className="md:ms-6"
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
            /> */}

            <LinkButton
              href={`${ROUTES.GRAPES_JS}/create`}
              className="w-full h-12 md:ms-6 md:w-auto"
            >
              <span className="block md:hidden xl:block">+ Add GrapesJS</span>
              <span className="hidden md:block xl:hidden">
                + {t("form:button-label-add")}
              </span>
            </LinkButton>
          </div>
        </div>
      </Card>
      <GrapeJsList
        grapesjs={data?.grapesJs}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

GrapesJS.authenticate = {
  permissions: adminOnly,
};
GrapesJS.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
