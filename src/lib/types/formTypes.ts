/**
 * Represents the state of each form's fields.
 *
 * @template TForm - The shape of the form.
 */
export type Forms<TForm> = {
  [Key in keyof TForm]: TForm[Key];
};

/**
 * Represents the optional metadata of each form.
 *
 * @template TForm - The shape of the form.
 */
export type FormsMeta<TForm> = {
  [Key in keyof TForm]?: FormFieldMeta<TForm[Key]>;
};

/**
 * Represents the metadata for each form field.
 *
 * @template TForm - The type of the form values.
 */
export type FormFieldMeta<TForm> = {
  [Key in keyof TForm]: {
    required?: boolean;
    errorMessage?: string;
    showError?: boolean;
    touched?: boolean;
  };
};

/**
 * Represents the global state of all forms, including both the form values and metadata.
 *
 * @template TForm - The shape of the form.
 */
export type FormState<TForm> = {
  forms: Forms<TForm>;
  formsMeta: FormsMeta<TForm>;
};

/**
 * Represents the different types of actions that can be performed to update the form state.
 *
 * @template TForm - The shape of the form.
 */
export type FormAction<
  TForm,
  TFormKey extends keyof TForm,
  TFieldKey extends keyof TForm[TFormKey],
> =
  | {
      type: 'SET_FORM_VALUE';
      formKey: TFormKey;
      formValue: TForm[TFormKey];
    }
  | {
      type: 'SET_FORM_FIELD_VALUE';
      formKey: TFormKey;
      fieldKey: TFieldKey;
      fieldValue: TForm[TFormKey][TFieldKey];
    }
  | {
      type: 'SET_FORM_META_VALUE';
      formKey: TFormKey;
      metaValue: Partial<FormFieldMeta<TForm[TFormKey]>>;
    }
  | {
      type: 'SET_FORM_META_FIELD_VALUE';
      formKey: TFormKey;
      fieldKey: TFieldKey;
      fieldValue: Partial<FormFieldMeta<TForm[TFormKey][TFieldKey]>>;
    }
  | {
      type: 'RESET_FORM';
    };

export type FormDispatch<TForm> = <
  TField extends keyof TForm = keyof TForm,
  TKey extends keyof TForm[TField] = keyof TForm[TField],
>(
  action: FormAction<TForm, TField, TKey>,
) => void;
