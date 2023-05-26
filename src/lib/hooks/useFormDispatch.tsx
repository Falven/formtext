import { useContext } from 'react';

import { FormDispatchContext } from '../context/FormDispatchContext';
import { type FormDispatch } from '../types/form-types';

/**
 * useFormDispatch hook - Provides access to the dispatch function for form actions.
 *
 * @template TForm - The shape of the form.
 * @returns The dispatch function for form actions.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 *
 * This hook provides access to the dispatch function when used inside a component that
 * is a child of the `FormProvider`. It will throw an error if used outside of the `FormProvider`.
 * The dispatch function can be used to update the form state by dispatching 'SET_FORM_FIELD_VALUE',
 * 'SET_FORM_META_FIELD_VALUE', or 'RESET_FORM' actions.
 */
export const useFormDispatch = <TForm,>(): FormDispatch<TForm> => {
  const dispatch = useContext(FormDispatchContext);
  if (dispatch === null) {
    throw new Error('useFormDispatch must be used within a FormProvider');
  }
  return dispatch;
};
