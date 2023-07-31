import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { AvatarGroup } from '@hilla/react-components/AvatarGroup.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

// tag::snippet[]
function Example() {
  const [items, setItems] = useState<{ name: string }[]>([]);
  const [i18n, setI18n] = useState<{
    anonymous: string;
    activeUsers: { one: string; many: string };
    joined: string;
    left: string;
  }>({
    anonymous: 'Anonyymi',
    activeUsers: {
      one: 'Yksi käyttäjä aktiivisena',
      many: '{count} käyttäjää aktiivisena',
    },
    joined: 'liittyi',
    left: 'lähti',
  });

  useEffect(() => {
    getPeople({ count: 2 }).then(({ people }) => {
      people.unshift({
        address: {
          city: '',
          country: '',
          phone: '',
          state: '',
          street: '',
          zip: '',
        },
        birthday: '',
        email: '',
        firstName: '',
        id: -1,
        lastName: '',
        membership: '',
        pictureUrl: '',
        profession: '',
        subscriber: false,
        manager: false,
        managerId: -1,
        status: '',
      });
      setItems(
        people.map((person) => ({
          name: `${person.firstName} ${person.lastName}`,
        }))
      );
    });
  }, []);

  return <AvatarGroup i18n={i18n} items={items} />;
}
// end::snippet[]

export default reactExample(Example);
