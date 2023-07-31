import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { GridPro, GridProEditColumn } from '@hilla/react-components/GridPro.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <GridPro items={items}>
        <GridProEditColumn path="firstName" />
        <GridProEditColumn path="lastName" />
        <GridProEditColumn path="email" />
        <GridProEditColumn path="profession" />
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
