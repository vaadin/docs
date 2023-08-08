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
    // tag::snippet[]
    <GridPro items={items} enterNextRow>
      <GridProEditColumn path="firstName" />

      <GridProEditColumn
        path="membership"
        editorType="select"
        editorOptions={['Regular', 'Premium', 'VIP']}
      />

      <GridProEditColumn path="subscriber" editorType="checkbox" />

      {/*
        Unfortunately custom editors don't currently work with React-based GridPro

        <GridProEditColumn
          path="birthday"
          editModeRenderer={({ item: { birthday } }) => (
            <DatePicker style={{ width: '100%' }} value={birthday} />
          )}
        >
          {({ item: { birthday } }) => format(parseISO(birthday), 'MM/dd/yyyy')}
        </GridProEditColumn> */}
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
