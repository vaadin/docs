import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import type { GridItemModel } from '@vaadin/react-components/Grid.js';
import { GridPro } from '@vaadin/react-components-pro/GridPro.js';
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

  const isSubscriber = (model: GridItemModel<Person>) => model.item.subscriber;

  return (
    // tag::snippet[]
    <GridPro items={items.value}>
      <GridProEditColumn path="firstName" />
      <GridProEditColumn path="lastName" />
      <GridProEditColumn path="email" isCellEditable={isSubscriber} />
      <GridProEditColumn path="subscriber" editorType="checkbox" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
