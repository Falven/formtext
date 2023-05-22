import { createContext } from 'react';
import { FormState } from '../types/formTypes';

/**
 * The form context, which stores the form state.
 */
export const FormContext = createContext<null | FormState<unknown>>(null);
