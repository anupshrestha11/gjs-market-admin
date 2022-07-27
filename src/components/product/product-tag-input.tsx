import Label from '@components/ui/label';
import { Control, Controller } from 'react-hook-form';
import { useTagsQuery } from '@data/tag/use-tags.query';
import { useTranslation } from 'next-i18next';
import CreateableSelect from 'react-select/creatable'
import { useCreateTagMutation } from '@data/tag/use-tag-create.mutation';
import { selectStyles } from '@components/ui/select/select.styles';


interface Props {
  control: Control<any>;
  setValue: any;
  watch: any;
}

const ProductTagInput = ({ control, setValue, watch }: Props) => {

  const { t } = useTranslation();
  const { data, isLoading: loading, refetch } = useTagsQuery({
    limit: 999,
    // type: type?.slug,
  });

  const { mutateAsync: createTag } = useCreateTagMutation(false);

  const handleCreate = async (value: any) => {

    console.log(value)
    const input = {
      name: value
    }
    await createTag({
      variables: {
        input
      },
    })
    refetch().then(resp => {
      setValue("tags", [...watch('tags'), resp.data?.tags?.data.find(item => item.name === value)])
    })
  }



  return (
    <div>
      <Label>{t('sidebar-nav-item-tags')}</Label>
      <Controller
        control={control}
        name="tags"

        render={({ field }) => <CreateableSelect
          {...field}
          isMulti
          isClearable
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          // @ts-ignore
          options={data?.tags?.data}
          isLoading={loading}
          onCreateOption={handleCreate}
          styles={selectStyles}

        />}
      />

    </div>
  );
};

export default ProductTagInput;
