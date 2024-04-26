import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';

function Example() {
  useSignals(); // hidden-source-line
  const person = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      person.value = people[0];
    });
  }, []);

  // tag::snippet[]
  const menuBarItems = [
    {
      component: (
        <Avatar
          name={`${person.value?.firstName} ${person.value?.lastName}`}
          img={person.value?.pictureUrl}
        />
      ),
      children: [
        {
          text: 'Profile',
        },
        {
          text: 'Settings',
        },
        {
          text: 'Help',
        },
        {
          text: 'Sign out',
        },
      ],
    },
  ];

  return <MenuBar items={menuBarItems} theme="tertiary-inline" />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
