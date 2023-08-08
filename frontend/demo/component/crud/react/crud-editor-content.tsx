import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
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
        <TextField label="First name" {...{ path: 'firstName' }} required />
        <TextField label="Last name" {...{ path: 'lastName' }} required />
        <EmailField {...{ colspan: 2 }} label="Email" {...{ path: 'email' }} required />
        <ComboBox
          {...{ colspan: 2 }}
          label="Profession"
          {...{ path: 'profession' }}
          items={professions}
        />
      </FormLayout>
    </Crud>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
