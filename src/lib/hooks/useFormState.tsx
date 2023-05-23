import { useFormValues } from './useFormValues';
import { useFormMeta } from './useFormMeta';
import { type FormFieldMeta } from '../types/formTypes';

/**
 * useFormState hook - Provides access to both the form values and metadata.
 *
 * @template TForm - The shape of the form.
 * @template TKey - The key of the form.
 * @param formName - The name of the form.
 * @returns A tuple containing the form values and metadata.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 */
export const useFormState = <TForm, TKey extends keyof TForm>(
  formName: TKey,
): [TForm[TKey], FormFieldMeta<TForm[TKey]> | undefined] => {
  const values = useFormValues<TForm, TKey>(formName);
  const meta = useFormMeta<TForm, TKey>(formName);

  return [values, meta];
};
