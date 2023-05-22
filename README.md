# @falven/formtext

FormText is a pure state management library for forms in React. It uses the context API for state management and provides a set of utility hooks for form state, dispatch actions, and more.

## Installation

```bash
pnpm install @falven/formtext
```

## Usage

Here's a simple example of how to use FormText:

```tsx
import { FormProvider, useFormContext, useFormValues } from '@falven/formtext';

const MyForm = () => {
  const formState = useFormContext<MyFormValues>();
  const formValues = useFormValues<MyFormValues>('myForm');

  return (
    <div>
      {/* form implementation */}
    </div>
  );
};

const App = () => (
  <FormProvider initialState={...}>
    <MyForm />
  </FormProvider>
);
```

In this example, we wrap our application with the `FormProvider` to provide form state to all child components. Then in our form component, we can use various hooks to access and manipulate the form state.

- `useFormContext`: Returns the entire form state.
- `useFormValues`: Returns the values of a specific form.
- `useFormMeta`: Returns the metadata of a specific form.
- `useFormState`: Returns both the values and metadata of a specific form.
- `useFormDispatch`: Returns the dispatch function for form actions.

## API

- `FormProvider`: A component that provides form state and dispatch function to its children.

- `useFormContext`: Hook that returns the form state.

- `useFormValues`: Hook that returns the values of a specific form.

- `useFormMeta`: Hook that returns the metadata of a specific form.

- `useFormState`: Hook that returns both the values and metadata of a specific form.

- `useFormDispatch`: Hook that returns the dispatch function for form actions.

For more details, please refer to the source code.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
