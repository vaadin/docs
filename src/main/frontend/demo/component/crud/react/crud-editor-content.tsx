import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Crud, crudPath } from '@vaadin/react-components-pro/Crud.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const professions = useSignal<string[]>([]);
  const responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '30em', columns: 2 },
  ];

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
      professions.value = [...new Set(people.map((i) => i.profession))];
    });
  }, []);

  return (
    // tag::snippet[]
    <Crud include="firstName, lastName, email, profession" items={items.value}>
      <FormLayout slot="form" style={{ maxWidth: '480px' }} responsiveSteps={responsiveSteps}>
        <TextField label="First name" {...crudPath('firstName')} required />
        <TextField label="Last name" {...crudPath('lastName')} required />
        <EmailField label="Email" {...crudPath('email')} required data-colspan="2" />
        <ComboBox
          data-colspan="2"
          label="Profession"
          {...crudPath('profession')}
          items={professions.value}
        />
      </FormLayout>
    </Crud>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
