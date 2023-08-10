import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { createRoot } from 'react-dom/client';

function Example() {
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      setPerson(people[0]);
    });
  }, []);

  // tag::snippet[]
  // Workaround https://github.com/vaadin/react-components/issues/132
  function menuComponent(component: React.ReactNode) {
    const container = document.createElement('div');
    createRoot(container).render(component);
    return container;
  }

  const menuBarItems = [
    {
      component: menuComponent(
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
