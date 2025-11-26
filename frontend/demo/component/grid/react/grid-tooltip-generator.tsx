import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { differenceInYears, parseISO } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridEventContext } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const statusRenderer = ({ item: { status } }: { item: Person }) => {
  const icon = status === 'Available' ? 'check' : 'close-small';
  const theme = status === 'Available' ? 'success' : 'error';

  return (
    <Icon icon={`vaadin:${icon}`} style={{ padding: '0.25rem' }} {...{ theme: `badge ${theme}` }} />
  );
};

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // tag::snippet[]
  const tooltipGenerator = (context: GridEventContext<Person>): string => {
    let text = '';

    const { column, item } = context;
    if (column && item) {
      switch (column.path) {
        case 'birthday':
          text = `Age: ${differenceInYears(Date.now(), parseISO(item.birthday))}`;
          break;
        case 'status':
          text = item.status;
          break;
        default:
          break;
      }
    }

    return text;
  };

  return (
    <Grid items={items.value}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="birthday" />
      <GridColumn path="status" renderer={statusRenderer} />
      <Tooltip slot="tooltip" generator={tooltipGenerator} />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
