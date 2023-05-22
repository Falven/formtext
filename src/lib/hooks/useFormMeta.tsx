import { useFormContext } from './useFormContext';
import { FormFieldMeta } from '../types/formTypes';

/**
 * useFormMeta hook - Provides access to the form metadata.
 *
 * @template TForm - The shape of the form.
 * @template TKey - The key of the form.
 * @param formName - The name of the form.
 * @returns The form metadata.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 */
export const useFormMeta = <TForm, TKey extends keyof TForm>(
  formName: TKey,
): FormFieldMeta<TForm[TKey]> | undefined => {
  const { formsMeta } = useFormContext<TForm>();
  return formsMeta[formName];
};
