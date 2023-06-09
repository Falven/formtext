import { useCallback } from 'react';

import { useFormDispatch } from './useFormDispatch';
import type { FieldMeta, FormAction } from '../types/form-types';

/**
 * The return type of `useFormHandler`, containing callback functions to manage form state updates and error handling.
 *
 * @template TForm - Type representing the form state, describing the structure and data types of the forms.
 *
 * @property handleChange - A callback function that is triggered whenever a form field is updated. It takes as parameters the keys of the form and the field being updated, the new value of the field, and optionally, an error message generated by a validation function. It updates the field's value in the form state, marks the field as touched, and sets the error message if any.
 *
 * @property handleBlur - A callback function that is triggered when a form field loses focus, typically used to trigger validation logic. It takes as parameters the keys of the form and the field losing focus, and optionally, an error message generated by a validation function. It sets the error message and toggles its visibility.
 *
 * @property setAndShowError - A callback function that manually sets an error message for a specific form field and toggles its visibility. It takes as parameters the keys of the form and the field for which to set the error, and the error message.
 *
 * @property reset - A callback function that resets the form state to its initial state.
 */
export interface UseFormHandlerResult<TForm> {
  /**
   * A callback function that is triggered whenever a form field is updated. It takes as parameters the keys of the form and the field being updated, the new value of the field, and optionally, an error message generated by a validation function. It updates the field's value in the form state, marks the field as touched, and sets the error message if any.
   */
  handleChange: <TField extends keyof TForm, TKey extends keyof TForm[TField]>(
    formKey: TField,
    fieldKey: TKey,
    fieldValue: TForm[TField][TKey],
    errorMessage?: string,
  ) => void;
  /**
   * A callback function that is triggered when a form field loses focus, typically used to trigger validation logic. It takes as parameters the keys of the form and the field losing focus, and optionally, an error message generated by a validation function. It sets the error message and toggles its visibility.
   */
  handleBlur: <TField extends keyof TForm, TKey extends keyof TForm[TField]>(
    formKey: TField,
    fieldKey: TKey,
    errorMessage?: string,
  ) => void;
  /**
   * A callback function that manually sets an error message for a specific form field and toggles its visibility. It takes as parameters the keys of the form and the field for which to set the error, and the error message.
   */
  setAndShowError: <TField extends keyof TForm, TKey extends keyof TForm[TField]>(
    formKey: TField,
    fieldKey: TKey,
    errorMessage?: string,
  ) => void;
  /**
   * A callback function that resets the form state to its initial state.
   */
  resetForm: <TField extends keyof TForm>(formKey: TField) => void;
}

/**
 * `useFormHandler` is a custom hook that returns callback functions to manage form state updates and error handling.
 *
 * @template TForm - Type representing the form state, describing the structure and data types of the forms.
 *
 * @returns An object containing four callback functions: `handleChange`, `handleBlur`, `resetForm`, and `setAndShowError`.
 * Each of these callbacks are used to handle specific events in the form lifecycle.
 *
 * `handleChange` is called whenever a field in the form is updated.
 * `handleBlur` is called whenever a field loses focus, typically used to trigger validation logic.
 * `resetForm` is called to reset the form state back to its initial state.
 * `setAndShowError` is called to manually set an error message for a specific form field and toggle its visibility.
 */
export const useFormHandler = <TForm,>(): UseFormHandlerResult<TForm> => {
  const dispatch = useFormDispatch<TForm>();

  /**
   * `setAndShowError` is called to manually set an error message for a specific field and toggle its visibility.
   *
   * @template TFormKey - The key of the form within the global form state.
   * @template TFieldKey - The key of the field within the form.
   *
   * @param formKey - The key of the form.
   * @param fieldKey - The key of the field.
   * @param errorMessage - The error message to set for the field.
   */
  const setAndShowError = useCallback(
    <TFormKey extends keyof TForm, TFieldKey extends keyof TForm[TFormKey]>(
      formKey: TFormKey,
      fieldKey: TFieldKey,
      errorMessage?: string,
    ) => {
      const fieldValue: FieldMeta = {
        __typename: 'FieldMeta',
        errorMessage,
        showError: errorMessage !== undefined,
      };
      const action: FormAction<TForm, TFormKey, TFieldKey> = {
        type: 'SET_FORM_META_FIELD_VALUE',
        formKey,
        fieldKey,
        metaFieldValue: fieldValue,
      };
      dispatch(action);
    },
    [dispatch],
  );

  /**
   * `handleChange` updates the form state by setting the field's value, marking it as touched,
   * and setting the error message, if any.
   *
   * @template TValue - The type of the field value.
   *
   * @param formKey - The key of the form within the global form state.
   * @param fieldKey - The key of the field within the form.
   * @param fieldValue - The new value of the form field.
   * @param errorMessage - The error message generated by the validation function, if any.
   */
  const handleChange = useCallback(
    <TField extends keyof TForm, TKey extends keyof TForm[TField]>(
      formKey: TField,
      fieldKey: TKey,
      fieldValue: TForm[TField][TKey],
      errorMessage?: string,
    ) => {
      let action: FormAction<TForm, TField, TKey> = {
        type: 'SET_FORM_FIELD_VALUE',
        formKey,
        fieldKey,
        fieldValue,
      };
      dispatch(action);

      const metaFieldValue: FieldMeta = {
        __typename: 'FieldMeta',
        touched: true,
      };
      action = {
        type: 'SET_FORM_META_FIELD_VALUE',
        formKey,
        fieldKey,
        metaFieldValue,
      };
      dispatch(action);

      // Set error message and visibility
      setAndShowError(formKey, fieldKey, errorMessage);
    },
    [dispatch, setAndShowError],
  );

  /**
   * `handleBlur` is called when a form field loses focus. This typically triggers validation logic,
   * setting the error message and toggling its visibility accordingly.
   *
   * @param formKey - The key of the form within the global form state.
   * @param fieldKey - The key of the field within the form.
   * @param errorMessage - The error message generated by the validation function, if any.
   */
  const handleBlur = useCallback(
    <TField extends keyof TForm, TKey extends keyof TForm[TField]>(
      formKey: TField,
      fieldKey: TKey,
      errorMessage?: string,
    ) => {
      setAndShowError(formKey, fieldKey, errorMessage);
    },
    [setAndShowError],
  );

  /**
   * `resetForm` is called to reset the entire form state back to its initial state.
   */
  const resetForm = useCallback(
    <TField extends keyof TForm>(formKey: TField) => {
      dispatch({ type: 'RESET_FORM', formKey });
      dispatch({ type: 'RESET_FORM_META', formKey });
    },
    [dispatch],
  );

  return { setAndShowError, handleChange, handleBlur, resetForm };
};
