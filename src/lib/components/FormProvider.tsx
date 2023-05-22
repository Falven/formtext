import { useReducer, type ReactNode } from 'react';

import { FormContext } from '../context/FormContext';
import { FormDispatchContext } from '../context/FormDispatchContext';
import type { FormAction, FormDispatch, FormState } from '../types/formTypes';

/**
 * Represents the properties needed by the FormProvider component.
 *
 * @template TForm - The shape of the form.
 */
interface FormProviderProps<TForm> {
  initialState: FormState<TForm>;
  children: ReactNode;
}

/**
 * FormProvider component that provides the form state and dispatch function to its children.
 *
 * @template TForm - The shape of the form.
 * @param initialState - The initial form state.
 * @param children - The child components of the FormProvider.
 *
 * The `FormProvider` wraps its children with the provided initial form state,
 * providing them with access to both the state of the forms and the dispatch
 * function to update the state based on defined actions.
 */
export const FormProvider = <TForm, TField extends keyof TForm, TKey extends keyof TForm[TField]>({
  initialState,
  children,
}: FormProviderProps<TForm>) => {
  /**
   * useReducer hook to manage form state based on dispatched actions.
   */
  const [state, dispatch] = useReducer(
    (state: FormState<TForm>, action: FormAction<TForm, TField, TKey>): FormState<TForm> => {
      switch (action.type) {
        case 'SET_FORM_VALUE':
          // Update the form values while preserving other forms' state.
          return {
            ...state,
            forms: {
              ...state.forms,
              [action.formKey]: {
                ...(state.forms[action.formKey] || {}),
                ...action.formValue,
              },
            },
          };
        case 'SET_FORM_FIELD_VALUE':
          // Update the form values while preserving other forms' state.
          return {
            ...state,
            forms: {
              ...state.forms,
              [action.formKey]: {
                ...(state.forms[action.formKey] || {}),
                [action.fieldKey]: action.fieldValue,
              },
            },
          };
        case 'SET_FORM_META_VALUE':
          // Update the form metadata while preserving other forms' metadata.
          return {
            ...state,
            formsMeta: {
              ...state.formsMeta,
              [action.formKey]: {
                ...(state.formsMeta[action.formKey] || {}),
                ...action.metaValue,
              },
            },
          };
        case 'SET_FORM_META_FIELD_VALUE':
          // Update the form metadata while preserving other forms' metadata.
          return {
            ...state,
            formsMeta: {
              ...state.formsMeta,
              [action.formKey]: {
                ...(state.formsMeta[action.formKey] || {}),
                [action.fieldKey]: {
                  ...(state.formsMeta[action.formKey]?.[action.fieldKey] || {}),
                  ...action.fieldValue,
                },
              },
            },
          };
        case 'RESET_FORM':
          // Reset form to initial state.
          return initialState;
        default:
          throw new Error(`Unhandled value: ${JSON.stringify(action)}`);
      }
    },
    initialState,
  );

  return (
    <FormContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch as FormDispatch<unknown>}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
};
