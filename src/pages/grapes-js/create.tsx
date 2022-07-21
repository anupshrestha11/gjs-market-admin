import Layout from "@components/layouts/admin";
import CreateOrUpdateGrapesJsForm from "@components/grapes-js/grapes-js-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function CreateGrapesJsPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {/* {t("form:form-title-create-category")} */}
          Create New GrapesJS
        </h1>
      </div>
      <CreateOrUpdateGrapesJsForm />
    </>
  );
}

CreateGrapesJsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
