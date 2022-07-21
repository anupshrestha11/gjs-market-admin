import * as yup from 'yup';
export const grapesJsValidationSchema = yup.object().shape({
  version: yup.string().required('Version is Required'),
});
