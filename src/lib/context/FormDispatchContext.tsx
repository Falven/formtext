import { createContext } from 'react';

import { type FormDispatch } from '../types/formTypes';

/**
 * The form dispatch context, which stores the dispatch function for form actions.
 */
export const FormDispatchContext = createContext<null | FormDispatch<unknown>>(null);
