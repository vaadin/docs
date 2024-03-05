import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import {
  ComboBox,
  Crud,
  crudPath,
  EmailField,
  FormLayout,
  type FormLayoutResponsiveStep,
  TextField,
} from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [professions, setProfessions] = useState<string[]>([]);
  const [responsiveSteps, setResponsiveSteps] = useState<FormLayoutResponsiveStep[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(people);
      setProfessions([...new Set(people.map((i) => i.profession))]);
      setResponsiveSteps([
        { minWidth: 0, columns: 1 },
        { minWidth: '30em', columns: 2 },
      ]);
    });
  }, []);

  return (
    // tag::snippet[]
    <Crud include="firstName, lastName, email, profession" items={items}>
      <FormLayout slot="form" style={{ maxWidth: '480px' }} responsiveSteps={responsiveSteps}>
        <TextField label="First name" {...crudPath('firstName')} required />
        <TextField label="Last name" {...crudPath('lastName')} required />
        <EmailField label="Email" {...crudPath('email')} required data-colspan="2" />
        <ComboBox
          data-colspan="2"
          label="Profession"
          {...crudPath('profession')}
          items={professions}
        />
      </FormLayout>
    </Crud>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
