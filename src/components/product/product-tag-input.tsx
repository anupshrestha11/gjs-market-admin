import Label from '@components/ui/label';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import CreateableSelect from 'react-select/creatable'
import { selectStyles } from '@components/ui/select/select.styles';
import { useState } from 'react';


interface Props {
  control: Control<any>;
  setValue: any;
  watch: any;
  data: any;
  loading: any;
}

const ProductTagInput = ({ control, setValue, watch, data, loading }: Props) => {

  const { t } = useTranslation();

  const [tagInputValue, setTagInputValue] = useState('')


  const handleCreate = (value: any) => {

    const input = {
      name: value,
      id: value
    }
    setValue("tags", [...watch('tags'), input])
  }

  const handleKeyPress = (event: any) => {
    if (watch('tags').length >= 6) {
      event.preventDefault()
      return
    }
    switch (event.key) {
      case 'Enter':
      case 'Tab':


        if (!tagInputValue) return
        event.preventDefault()

        handleCreate(tagInputValue)
        setTagInputValue('')

        break

      default:
        break
    }
  }

  const handleInputChange = (value: any) => {
    setTagInputValue(value)
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
          getOptionLabel={(option: any) => option.name || `Create new ${option.value}`}
          getOptionValue={(option: any) => option.id}
          // @ts-ignore
          options={data?.tags?.data}
          isLoading={loading}
          onCreateOption={handleCreate}
          styles={selectStyles}
          isOptionDisabled={() => watch('tags').length >= 6}
          inputValue={tagInputValue}
          onKeyDown={handleKeyPress}
          onInputChange={handleInputChange}

        />}
      />

    </div>
  );
};

export default ProductTagInput;
