import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Crud, crudPath } from '@vaadin/react-components/Crud.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const professions = useSignal<string[]>([]);
  const responsiveSteps = useSignal<FormLayoutResponsiveStep[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
      professions.value = [...new Set(people.map((i) => i.profession))];
      responsiveSteps.value = [
        { minWidth: 0, columns: 1 },
        { minWidth: '30em', columns: 2 },
      ];
    });
  }, []);

  return (
    // tag::snippet[]
    <Crud include="firstName, lastName, email, profession" items={items.value}>
      <FormLayout slot="form" style={{ maxWidth: '480px' }} responsiveSteps={responsiveSteps.value}>
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
