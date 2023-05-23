import { useContext } from 'react';

import { FormContext } from '../context/FormContext';
import { type FormState } from '../types/formTypes';

/**
 * useFormContext hook - Provides access to the form state.
 *
 * @template TForm - The shape of the form.
 * @returns The form state.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 *
 * This hook provides access to the form state when used inside a component that
 * is a child of the `FormProvider`. It will throw an error if used outside of the `FormProvider`.
 */
export const useFormContext = <TForm,>(): FormState<TForm> => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as FormState<TForm>;
};
