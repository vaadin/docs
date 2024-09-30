import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/notification';
import {
  GridPro,
  type GridProItemPropertyChangedEvent,
} from '@vaadin/react-components-pro/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components-pro/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  const showErrorNotification = (msg: string) => {
    Notification.show(msg, { position: 'bottom-center', theme: 'error' });
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
    // tag::snippet[]
    <GridPro items={items.value} onItemPropertyChanged={itemPropertyListener}>
      <GridProEditColumn path="firstName" />
      <GridProEditColumn path="lastName" />
      <GridProEditColumn path="email" />
      <GridProEditColumn path="address.phone" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
