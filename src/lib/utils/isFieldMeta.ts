import { type FieldMeta } from '../types/form-types';

/**
 * Checks if the given item is a FieldMeta object
 * @param item The item to check
 * @returns True if the item is a FieldMeta object, false otherwise
 */
export const isFieldMeta = (item: any): item is FieldMeta => {
  return (
    typeof item === 'object' &&
    'id' in item &&
    'required' in item &&
    'touched' in item &&
    'errorMessage' in item
  );
};
