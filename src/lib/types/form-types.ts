/**
 * Represents the state of each form's fields.
 *
 * @template TForms - The shape of the form. This should be an object where keys represent
 * the form's name and values represent the shape of the form's fields.
 */
export type Forms<TForms> = {
  [FormKey in keyof TForms]: TForms[FormKey];
};

/**
 * This interface describes the metadata related to a particular field in a form.
 * It includes properties for handling validation and interaction states.
 */
export interface FieldMeta {
  __typename: 'FieldMeta';
  /**
   * The id of the field metadata
   */
  id?: string | number;
  /**
   * Whether the field is required or not
   */
  required?: boolean;
  /**
   * The error message to display for the field
   */
  errorMessage?: string;
  /**
   * Whether or not to display the error message
   */
  showError?: boolean;
  /**
   * Whether or not the field has been touched/interacted with
   */
  touched?: boolean;
}

export type Field = FieldMeta | FieldMeta[];

/**
 * This type describes the metadata for each field within a form.
 *
 * @template TField - The type of the form values. This should be an object where keys represent
 * the field's name and values represent the field metadata.
 */
export type FormFieldMeta<TField> = {
  [FieldKey in keyof TField]: FormFieldMeta<TField> | FormFieldMeta<TField>[] | Field;
};

/**
 * This type describes the metadata for each form.
 *
 * @template TForms - The shape of the form. This should be an object where keys represent
 * the form's name and values represent the metadata for each field within the form.
 */
export type FormsMeta<TForms> = {
  [FormKey in keyof TForms]?: FormFieldMeta<TForms[FormKey]>;
};

/**
 * This interface represents the global state of all forms, including both the form values and metadata.
 *
 * @template TForms - The shape of the form. This should be an object where keys represent
 * the form's name and values represent the form's state and metadata.
 */
export interface FormState<TForms> {
  /**
   * State of the forms' values
   */
  forms: Forms<TForms>;
  /**
   * Metadata of the forms
   */
  formsMeta: FormsMeta<TForms>;
}

/**
 * This type represents the different types of actions that can be performed to update the form state.
 *
 * @template TForms - The shape of the form.
 * @template TFormKey - Key of the form.
 * @template TFieldKey - Key of the field in the form.
 */
export type FormAction<
  TForms,
  TFormKey extends keyof TForms,
  TFieldKey extends keyof TForms[TFormKey] = keyof TForms[TFormKey],
> =
  | {
      /**
       * Action type for setting the value of a whole form
       */
      type: 'SET_FORM_VALUE';
      /**
       * Key of the form to update
       */
      formKey: TFormKey;
      /**
       * The new value for the form
       */
      formValue: TForms[TFormKey];
    }
  | {
      /**
       * Action type for setting the value of a specific field in a form
       */
      type: 'SET_FORM_FIELD_VALUE';
      /**
       * Key of the form that contains the field to update
       */
      formKey: TFormKey;
      /**
       * Key of the field to update
       */
      fieldKey: TFieldKey;
      /**
       * The new value for the field
       */
      fieldValue: TForms[TFormKey][TFieldKey];
    }
  | {
      /**
       * Action type for setting the metadata of a whole form
       */
      type: 'SET_FORM_META_VALUE';
      /**
       * Key of the form to update
       */
      formKey: TFormKey;
      /**
       * The new metadata for the form
       */
      metaValue: FormFieldMeta<TForms[TFormKey]>;
    }
  | {
      /**
       * Action type for setting the metadata of a specific field in a form
       */
      type: 'SET_FORM_META_FIELD_VALUE';
      /**
       * Key of the form that contains the field to update
       */
      formKey: TFormKey;
      /**
       * Key of the field to update
       */
      fieldKey: TFieldKey;
      /**
       * The new metadata for the field
       */
      metaFieldValue: FieldMeta | FieldMeta[];
    }
  | {
      /**
       * Action type for resetting all form values and metadata
       */
      type: 'RESET_FORM';
      /**
       * Key of the form that contains the field to update
       */
      formKey: TFormKey;
    }
  | {
      /**
       * Action type for resetting all form values and metadata
       */
      type: 'RESET_FORM_META';
      /**
       * Key of the form that contains the field to update
       */
      formKey: TFormKey;
    }
  | {
      /**
       * Action type for resetting all form values and metadata
       */
      type: 'RESET';
    };

/**
 * This type represents the dispatch function used to execute actions that update the form state.
 *
 * @template TForms - The shape of the form.
 */
export type FormDispatch<TForms> = <TField extends keyof TForms, TKey extends keyof TForms[TField]>(
  action: FormAction<TForms, TField, TKey>,
) => void;
