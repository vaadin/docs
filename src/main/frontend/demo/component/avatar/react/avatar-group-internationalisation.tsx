import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { AvatarGroup, type AvatarGroupI18n } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';

// tag::snippet[]
const i18n: AvatarGroupI18n = {
  anonymous: 'Anonyymi',
  activeUsers: {
    one: 'Yksi käyttäjä aktiivisena',
    many: '{count} käyttäjää aktiivisena',
  },
  joined: 'liittyi',
  left: 'lähti',
};
// end::snippet[]

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Array<{ name: string }>>([]);

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
      items.value = people.map((person) => ({
        name: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  // tag::snippet[]
  return <AvatarGroup i18n={i18n} items={items.value} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
