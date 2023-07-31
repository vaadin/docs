import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { Notification } from '@vaadin/notification';

export function Example() {
  const [items, setItems] = React.useState<Person[]>([]);

  React.useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const showErrorNotification = (msg: string) => {
    const notification = Notification.show(msg, { position: 'bottom-center' });
    notification.setAttribute('theme', 'error');
  };

  const itemPropertyListener = (event: CustomEvent<{ value: string; path: string }>) => {
    switch (event.detail.path) {
      case 'address.phone':
        if (!/^[0-9-]+$/.test(event.detail.value)) {
          // Incorrect phone
          event.preventDefault();
          showErrorNotification('Enter a valid phone number');
        }
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.detail.value)) {
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
        <GridPro.EditColumn path="firstName" />
        <GridPro.EditColumn path="lastName" />
        <GridPro.EditColumn path="email" />
        <GridPro.EditColumn path="address.phone" />
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
