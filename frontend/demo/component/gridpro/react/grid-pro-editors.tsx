import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { format, parseISO } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { GridPro } from '@vaadin/react-components-pro/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components-pro/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function birthdayRenderer({ item: { birthday } }: { item: Person }) {
  return format(parseISO(birthday), 'MM/dd/yyyy');
}

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
      <GridProEditColumn path="firstName" />
      <GridProEditColumn
        path="membership"
        editorType="select"
        editorOptions={['Regular', 'Premium', 'VIP']}
      />
      <GridProEditColumn path="subscriber" editorType="checkbox" />
      <GridProEditColumn
        path="birthday"
        renderer={birthdayRenderer}
        editModeRenderer={({ item: { birthday } }) => (
          <DatePicker style={{ width: '100%' }} value={birthday} />
        )}
      />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
