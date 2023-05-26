import { useFormContext } from './useFormContext';

/**
 * useFormValues hook - Provides access to the form values.
 *
 * @template TForm - The shape of the form.
 * @template TFormKey - The key of the form.
 * @param formName - The name of the form.
 * @returns The form values.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 *
 * This hook provides access to the values of a specific form when used inside a component that
 * is a child of the `FormProvider`. It will throw an error if used outside of the `FormProvider`.
 * Use this hook when you need to read or display the values of the form fields.
 */
export const useFormValues = <TForm, TFormKey extends keyof TForm>(
  formName: TFormKey,
): TForm[TFormKey] => {
  const { forms } = useFormContext<TForm>();
  return forms[formName];
};
