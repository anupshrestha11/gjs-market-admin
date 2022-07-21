import Layout from "@components/layouts/admin";
import CreateOrUpdateGrapesJsForm from "@components/grapes-js/grapes-js-form";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useGrapeJsQuery } from "@data/grapes-js/use-grape-js.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function UpdateGrapesJsPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useGrapeJsQuery(query.id as string);

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-category")}
        </h1>
      </div>

      <CreateOrUpdateGrapesJsForm initialValues={data} />
    </>
  );
}

UpdateGrapesJsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
