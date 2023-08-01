import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
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
      <GridPro items={items} enterNextRow>
        <GridProEditColumn
          header="Name (read-only)"
          renderer={({ item }) => (
            <>
              {item.firstName} {item.lastName}
            </>
          )}
        />

        <GridProEditColumn header="Profession (editable)" path="profession" />
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
