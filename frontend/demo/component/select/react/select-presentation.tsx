import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar, Select, SelectItem, SelectListBox } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const people = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 4 }).then(({ people: items }) => {
      people.value = items;
    });
  }, []);

  return (
    // tag::snippet[]
    <Select label="Choose doctor" style={{ width: '15em' }}>
      <SelectListBox>
        {people.value.map((person) => (
          <SelectItem value={String(person.id)} key={person.id}>
            <div className="person-item">
              <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
              <span>
                {person.firstName} {person.lastName}
              </span>
              <span>{person.profession}</span>
            </div>
          </SelectItem>
        ))}
      </SelectListBox>
    </Select>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
