import { useEffect } from 'react';
import { ValidationError } from '@vaadin/hilla-lit-form';
import { useForm } from '@vaadin/hilla-react-form';
import {
  Button,
  DatePicker,
  EmailField,
  HorizontalLayout,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import PersonModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/person/PersonModel';
import { PersonService } from 'Frontend/generated/endpoints';

// tag::snippet[]
export default function PersonView() {
  const { model, field, read, submit, reset } = useForm(PersonModel, {
    onSubmit: async (person) => {
      await PersonService.savePerson(person);
    },
  });

  useEffect(() => {
    PersonService.loadPerson().then(read);
  }, []);

  // tag::save[]
  async function save() {
    try {
      await submit();
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
      // The fields show the validation errors
    }
  }
  // end::save[]

  return (
    <VerticalLayout theme="padding">
      <TextField label="First name" {...field(model.firstName)} />
      <TextField label="Last name" {...field(model.lastName)} />
      <EmailField label="Email" {...field(model.email)} />
      <DatePicker label="Birth date" {...field(model.birthDate)} />
      <HorizontalLayout theme="spacing">
        <Button theme="primary" onClick={save}>
          Save
        </Button>
        <Button onClick={reset}>Reset</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
// end::snippet[]
