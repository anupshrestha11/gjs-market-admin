import Input from "@components/ui/input";
import { Control, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Label from "@components/ui/label";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";

import { Category } from "@ts-types/generated";
import { useGrapesJsQuery } from "@data/grapes-js/use-grapes-js.query";
import { useUpdateGrapesJsMutation } from "@data/grapes-js/use-grapes-js-update.mutation";
import { useCreateGrapesJsMutation } from "@data/grapes-js/use-grapes-js-create.mutation";
import { useTranslation } from "next-i18next";
import SelectInput from "@components/ui/select-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { grapesJsValidationSchema } from "./grapes-js-validation-schema";

function SelectCategories({
  control,
  setValue,
}: {
  control: Control<FormValues>;
  setValue: any;
}) {
  const { t } = useTranslation();

  const { data, isLoading: loading } = useGrapesJsQuery({
    limit: 999,
    // type: type?.slug,
  });
  return (
    <div>
      <Label>{"Parent Version"}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: any) => option.version}
        getOptionValue={(option: any) => option.id}
        options={data?.grapesJs?.data!}
        isClearable={true}
        isLoading={loading}
      />
    </div>
  );
}

type FormValues = {
  version: string;
  parent: any;
};

const defaultValues = {
  version: "",
  parent: "",
};

type IProps = {
  initialValues?: Category | null;
};
export default function CreateOrUpdateGrapesJsForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    // shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    resolver: yupResolver(grapesJsValidationSchema),
  });

  const { mutate: createGrapesJs, isLoading: creating } =
    useCreateGrapesJsMutation();
  const { mutate: updateGrapesJs, isLoading: updating } =
    useUpdateGrapesJsMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      version: values.version,
      parent_id: values.parent?.id ?? null,
    };
    if (initialValues) {
      updateGrapesJs({
        variables: {
          id: initialValues?.id,
          input: {
            ...input,
          },
        },
      });
    } else {
      createGrapesJs({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:input-label-description")}
          details={`${
            initialValues
              ? t("form:item-description-edit")
              : t("form:item-description-add")
          } ${"GrapesJs"}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={"Version"}
            {...register("version")}
            error={t(errors.version?.message!)}
            variant="outline"
            className="mb-5"
          />

          <SelectCategories control={control} setValue={setValue} />
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues ? "Update GrapeJs" : "Add GrapesJs"}
        </Button>
      </div>
    </form>
  );
}
