import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <GridPro items={items} enterNextRow>
        <GridProEditColumn path="firstName"></GridProEditColumn>
        <GridProEditColumn path="lastName"></GridProEditColumn>
        <GridProEditColumn path="email"></GridProEditColumn>
        <GridProEditColumn path="profession"></GridProEditColumn>
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
