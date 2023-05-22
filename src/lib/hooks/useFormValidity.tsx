import { useState, useEffect } from 'react';
import { useFormContext } from './useFormContext';
import { FormFieldMeta, FormsMeta } from '../types/formTypes';

/**
 * A custom hook that calculates the validity of a form based on the form state.
 *
 * It uses the form state and metadata to determine if the form is valid. A form is considered valid
 * if all required fields have been touched by the user and there are no error messages associated with them.
 *
 * @param formName - The name of the form to calculate validity for.
 * @returns A tuple containing a boolean representing form validity and a function to manually set form validity.
 */
export const useFormValidity = <TForm,>(
  formName: keyof FormsMeta<TForm>,
  validateTouch?: boolean,
) => {
  // Access the form metadata from the form context
  const { formsMeta } = useFormContext<TForm>();

  // Initialize the form validity state as false
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Retrieve the metadata for the specified form. The 'as' keyword is used here to tell TypeScript
    // that formMeta will never be undefined, since we're confident that every form will have metadata.
    const formMeta = formsMeta[formName] as FormFieldMeta<TForm[keyof TForm]>;

    if (formMeta === undefined) {
      throw new Error(
        `Form metadata for form '${String(
          formName,
        )}' is undefined. Did you forget to add it to the FormProvider?`,
      );
    }

    // Retrieve the keys from the form metadata
    const metaKeys = Object.keys(formMeta) as (keyof typeof formMeta)[];

    // Identify which fields in the form are required
    const requiredFields = metaKeys.filter((key) => formMeta[key]?.required === true);

    // Check if all required fields have been touched by the user
    const haveBeenTouched =
      validateTouch === undefined || validateTouch === true
        ? requiredFields.every((key) => formMeta[key]?.touched === true)
        : true;

    // Check if all required fields do not have any associated error messages
    const haveNoErrors = requiredFields.every((key) => formMeta[key]?.errorMessage === undefined);

    // If all required fields have been touched and have no errors, the form is valid. Update the form validity state.
    setIsFormValid(haveBeenTouched && haveNoErrors);
  }, [formName, formsMeta, validateTouch]);

  // Return the form validity state and the function to set it
  return [isFormValid, setIsFormValid] as const;
};
