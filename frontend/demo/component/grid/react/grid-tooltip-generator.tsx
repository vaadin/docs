import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState, useEffect } from 'react';
import { Grid, type GridEventContext } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { differenceInYears, parseISO } from 'date-fns';
import '@vaadin/icons';

const statusRenderer = ({ item: { status } }: { item: Person }) => {
  const icon = status === 'Available' ? 'check' : 'close-small';
  const theme = status === 'Available' ? 'success' : 'error';

  return (
    <Icon
      icon={`vaadin:${icon}`}
      style={{ padding: 'var(--lumo-space-xs)' }}
      {...{ theme: `badge ${theme}` }}
    />
  );
};

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
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
    <Grid items={items}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="birthday" />
      <GridColumn path="status" footerRenderer={() => null} headerRenderer={() => null}>
        {statusRenderer}
      </GridColumn>
      <Tooltip slot="tooltip" generator={tooltipGenerator} />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
