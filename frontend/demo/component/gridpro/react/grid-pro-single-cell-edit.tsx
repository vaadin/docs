import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <GridPro items={items} singleCellEdit>
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
