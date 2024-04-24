import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { GridPro } from '@vaadin/react-components/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components/GridProEditColumn.js';
import type { GridItemModel } from '@vaadin/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const isSubscriber = (model: GridItemModel<Person>) => model.item.subscriber;

  return (
    // tag::snippet[]
    <GridPro items={items}>
      <GridProEditColumn path="firstName" />
      <GridProEditColumn path="lastName" />
      <GridProEditColumn path="email" isCellEditable={isSubscriber} />
      <GridProEditColumn path="subscriber" editorType="checkbox" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
