import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { GridPro, type GridProItemPropertyChangedEvent } from '@hilla/react-components/GridPro.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { Notification } from '@vaadin/notification';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

export function Example() {
  const [items, setItems] = React.useState<Person[]>([]);

  React.useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const showErrorNotification = (msg: string) => {
    const notification = Notification.show(msg, { position: 'bottom-center' });
    notification.setAttribute('theme', 'error');
  };

  const itemPropertyListener = (event: GridProItemPropertyChangedEvent<Person>) => {
    switch (event.detail.path) {
      case 'address.phone':
        if (typeof event.detail.value === 'string' && !/^[0-9-]+$/.test(event.detail.value)) {
          // Incorrect phone
          event.preventDefault();
          showErrorNotification('Enter a valid phone number');
        }
        break;
      case 'email':
        if (
          typeof event.detail.value === 'string' &&
          !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.detail.value)
        ) {
          // Incorrect email
          event.preventDefault();
          showErrorNotification('Enter a valid email address');
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* tag::snippet[] */}
      <GridPro items={items} onItemPropertyChanged={itemPropertyListener}>
        <GridProEditColumn path="firstName" />
        <GridProEditColumn path="lastName" />
        <GridProEditColumn path="email" />
        <GridProEditColumn path="address.phone" />
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
