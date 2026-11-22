import { useEffect } from 'react';
import { ValidationError } from '@vaadin/hilla-lit-form';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import {
  Button,
  Notification,
  PasswordField,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import SignUpModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/signup/SignUpModel';
import { SignUpService } from 'Frontend/generated/endpoints';

// tag::snippet[]
export default function SignUpView() {
  const { model, field, submit, addValidator } = useForm(SignUpModel, {
    onSubmit: async (value) => {
      await SignUpService.signUp(value);
      Notification.show('Account created');
    },
  });
  const username = useFormPart(model.username);

  useEffect(() => {
    // tag::field[]
    username.addValidator({
      message: 'Use only lowercase letters and digits',
      validate: (value) => /^[a-z0-9]*$/u.test(value),
    });
    // end::field[]
    // tag::form[]
    addValidator({
      message: 'The passwords do not match',
      validate: (value) =>
        value.password === value.passwordConfirmation || [{ property: model.passwordConfirmation }],
    });
    // end::form[]
  }, []);

  async function signUp() {
    try {
      await submit();
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
      // The fields show the validation errors
    }
  }

  return (
    <VerticalLayout theme="padding">
      <TextField label="Username" {...field(model.username)} />
      <PasswordField label="Password" {...field(model.password)} />
      <PasswordField label="Confirm password" {...field(model.passwordConfirmation)} />
      <Button theme="primary" onClick={signUp}>
        Sign up
      </Button>
    </VerticalLayout>
  );
}
// end::snippet[]
