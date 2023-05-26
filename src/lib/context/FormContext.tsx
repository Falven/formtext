import { createContext } from 'react';

import { type FormState } from '../types/form-types';

/**
 * The form context, which stores the form state.
 */
export const FormContext = createContext<null | FormState<unknown>>(null);
