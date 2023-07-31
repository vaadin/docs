import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 4 }).then(({ people }) => setItems(people));
  }, []);

  return (
    <CheckboxGroup label="Invitees" theme="vertical">
      {items.map((person) => (
        <Checkbox key={person.id} value={String(person.id)}>
          <label style={{ display: 'flex' }}>
            <img style={{ height: '2em' }} src={person.pictureUrl} alt="User avatar" />
            <div>
              {person.firstName} {person.lastName}
              <div>{person.profession}</div>
            </div>
          </label>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

export default reactExample(Example); // hidden-source-line
