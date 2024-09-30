import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
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

  return (
    // tag::snippet[]
    <GridPro items={items.value} enterNextRow>
      <GridColumn header="Name (read-only)">
        {({ item }) => (
          <>
            {item.firstName} {item.lastName}
          </>
        )}
      </GridColumn>

      <GridProEditColumn header="Profession (editable)" path="profession" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
