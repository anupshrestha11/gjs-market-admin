import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useGrapesJsQuery } from "@data/grapes-js/use-grapes-js.query";
import { useTranslation } from "next-i18next";

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductGrapesJsInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation("common");

  const { data, isLoading: loading } = useGrapesJsQuery({
    limit: 999,
    // type: type?.slug,
  });

  data?.grapesJs?.data.sort((a, b) => a.version - b.version);

  return (
    <div className="mb-5">
      <Label>GrapesJS</Label>
      <SelectInput
        name="grapes_js"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.version}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={data?.grapesJs?.data}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductGrapesJsInput;
