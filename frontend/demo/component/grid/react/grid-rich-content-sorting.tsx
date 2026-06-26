import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { format, parseISO } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function employeeRenderer({ item: person }: { item: Person }) {
  return (
    <div className="person-item">
      <Avatar
        img={person.pictureUrl}
        name={`${person.firstName} ${person.lastName}`}
        style={{ '--vaadin-avatar-size': '2.25rem' }}
      />
      <span>
        {person.firstName} {person.lastName}
      </span>
      <span>{person.email}</span>
    </div>
  );
}

function birthdayRenderer({ item: person }: { item: Person }) {
  const birthday = parseISO(person.birthday);
  return (
    <>
      <div>{format(birthday, 'P')}</div>
      <div style={{ fontSize: '.875rem', color: 'var(--vaadin-text-color-secondary)' }}>
        Age: {Math.floor((Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25))}
      </div>
    </>
  );
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <Grid items={items.value}>
      <GridSortColumn header="Employee" path="lastName" renderer={employeeRenderer} />

      <GridSortColumn header="Birthdate" path="birthday" renderer={birthdayRenderer} />
    </Grid>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
