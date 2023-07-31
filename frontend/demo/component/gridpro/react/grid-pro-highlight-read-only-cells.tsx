import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(people);
    });
  }, []);

  return (
    <GridPro theme="highlight-read-only-cells" items={items}>
      {/* tag::snippet[] */}
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="membership" />
      <GridProEditColumn path="email" header="Email (Editable)" />
      {/* end::snippet[] */}
    </GridPro>
  );
}

export default reactExample(Example);
