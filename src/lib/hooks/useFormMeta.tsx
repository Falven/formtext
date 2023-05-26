import { useFormContext } from './useFormContext';
import { type FormFieldMeta } from '../types/form-types';

/**
 * useFormMeta hook - Provides access to the form metadata.
 *
 * @template TForm - The shape of the form.
 * @template TFormKey - The key of the form.
 * @param formName - The name of the form.
 * @returns The form metadata.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 */
export const useFormMeta = <TForm, TFormKey extends keyof TForm>(
  formName: TFormKey,
): FormFieldMeta<TForm[TFormKey]> | undefined => {
  const { formsMeta } = useFormContext<TForm>();
  return formsMeta[formName];
};
