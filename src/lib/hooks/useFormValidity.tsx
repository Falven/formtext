import { useState, useEffect } from 'react';

import { useFormContext } from './useFormContext';
import { FieldMeta, type FormFieldMeta, type FormsMeta } from '../types/form-types';
import { isFieldMeta } from '../utils/isFieldMeta';

export type useFormValidityResult = readonly [boolean, (valid: boolean) => void];

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
): useFormValidityResult => {
  // Access the form metadata from the form context
  const { formsMeta } = useFormContext<TForm>();

  // Initialize the form validity state as false
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Function that checks whether all fields in a form metadata object meet a specific condition using an iterative approach.
   *
   * @param formMeta - The form metadata object to be checked.
   * @param condition - The condition to be checked. This is a function that takes a FieldMeta object and returns a boolean.
   * @returns Returns a boolean indicating whether all fields in the form metadata object meet the specified condition.
   */
  const allFieldsMeetCondition = (
    formMeta: FormFieldMeta<any>,
    condition: (meta: FieldMeta) => boolean,
  ): boolean => {
    const queue: FormFieldMeta<any>[] = [formMeta];
    const visited = new Set<FormFieldMeta<any>>();

    while (queue.length > 0) {
      const currentMeta = queue.shift();
      if (currentMeta === undefined) {
        continue;
      }
      visited.add(currentMeta);

      for (const key in currentMeta) {
        // Ensure that the code only operates on the currentMeta's own properties
        // and not on properties it might have inherited through the prototype chain.
        if (!Object.hasOwn(currentMeta, key)) {
          continue;
        }

        const value = currentMeta[key];

        if (Array.isArray(value)) {
          for (const field of value) {
            if (isFieldMeta(field)) {
              if (!condition(field)) {
                return false;
              }
            } else if (typeof field === 'object' && !visited.has(field)) {
              queue.push(field);
            }
          }
        } else if (typeof value === 'object') {
          if (isFieldMeta(value)) {
            if (!condition(value)) {
              return false;
            }
          } else {
            const field = value as FormFieldMeta<any>;
            if (!visited.has(field)) {
              queue.push(field);
            }
          }
        }
      }
    }

    return true;
  };

  useEffect(() => {
    // Retrieve the metadata for the specified form
    const formMeta = formsMeta[formName] as FormFieldMeta<TForm[keyof TForm]>;

    if (formMeta === undefined) {
      throw new Error(
        `Form metadata for form '${String(
          formName,
        )}' is undefined. Did you forget to add it to the FormProvider?`,
      );
    }

    // Check if all required fields have been touched by the user
    const haveBeenTouched = allFieldsMeetCondition(
      formMeta,
      (meta) => meta.required !== true || (meta.touched ?? false),
    );

    // Check if all required fields do not have any associated error messages
    const haveNoErrors = allFieldsMeetCondition(
      formMeta,
      (meta) => meta.required !== true || meta.errorMessage === undefined,
    );

    // If all required fields have been touched and have no errors, the form is valid. Update the form validity state.
    setIsFormValid(haveBeenTouched && haveNoErrors);
  }, [formName, formsMeta, validateTouch]);

  // Return the form validity state and the function to set it
  return [isFormValid, setIsFormValid] as const;
};
