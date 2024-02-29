import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar, MenuBar } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      setPerson(people[0]);
    });
  }, []);

  // tag::snippet[]
  const menuBarItems = [
    {
      component: (
        <Avatar name={`${person?.firstName} ${person?.lastName}`} img={person?.pictureUrl} />
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
