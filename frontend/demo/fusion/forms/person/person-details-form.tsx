import { useEffect } from 'react';
import { $defaultValue } from '@vaadin/hilla-models';
import { useForm, useFormArrayPart, useFormPart } from '@vaadin/hilla-react-form';
import { Button, HorizontalLayout, TextField, VerticalLayout } from '@vaadin/react-components';
import type AddressModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/person/AddressModel';
import PersonModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/person/PersonModel';
import PhoneNumberModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/person/PhoneNumberModel';
import { PersonService } from 'Frontend/generated/endpoints';

// tag::address[]
function AddressForm({ model }: { model: AddressModel }) {
  const { field } = useFormPart(model);

  return (
    <HorizontalLayout theme="spacing">
      <TextField label="Street" {...field(model.street)} />
      <TextField label="Postal code" {...field(model.postalCode)} />
      <TextField label="City" {...field(model.city)} />
    </HorizontalLayout>
  );
}
// end::address[]

// tag::phone-number[]
function PhoneNumberForm({ model, onRemove }: { model: PhoneNumberModel; onRemove(): void }) {
  const { field } = useFormPart(model);

  return (
    <HorizontalLayout theme="spacing">
      <TextField label="Number" {...field(model.number)} />
      <TextField label="Label" {...field(model.label)} />
      <Button onClick={onRemove}>Remove</Button>
    </HorizontalLayout>
  );
}
// end::phone-number[]

// tag::snippet[]
export default function PersonDetailsView() {
  const { model, field, read } = useForm(PersonModel);
  const phoneNumbers = useFormArrayPart(model.phoneNumbers);
  const numbers = phoneNumbers.value ?? [];

  useEffect(() => {
    PersonService.loadPerson().then(read);
  }, []);

  return (
    <VerticalLayout theme="padding">
      <TextField label="First name" {...field(model.firstName)} />
      <AddressForm model={model.address} />
      {phoneNumbers.items.map((item, index) => (
        <PhoneNumberForm
          key={index}
          model={item}
          onRemove={() => phoneNumbers.setValue(numbers.filter((_, i) => i !== index))}
        />
      ))}
      <Button onClick={() => phoneNumbers.setValue([...numbers, PhoneNumberModel[$defaultValue]])}>
        Add phone number
      </Button>
    </VerticalLayout>
  );
}
// end::snippet[]
