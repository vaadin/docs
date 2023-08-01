import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';

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

export default reactExample(Example); // hidden-source-line
