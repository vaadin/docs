import { reactExample } from 'Frontend/demo/react-example';
import React, { useState, useEffect } from 'react';
import { GridPro, EditColumn, GridColumn } from '@hilla/react-components/GridPro.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <GridPro theme="highlight-editable-cells" items={items}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="membership" />
      <EditColumn path="email" header="Email (Editable)" />
    </GridPro>
  );
}

export default reactExample(Example);
