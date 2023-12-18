import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn, type GridColumnElement } from '@hilla/react-components/GridColumn.js';
import { getUserPermissions } from 'Frontend/demo/domain/DataService';
import { Icon } from '@hilla/react-components/Icon.js';
import type UserPermissions from 'Frontend/generated/com/vaadin/demo/domain/UserPermissions';
import '@vaadin/icons';

function Example() {
  const [items, setItems] = useState<UserPermissions[]>([]);

  useEffect(() => {
    getUserPermissions().then((data) => setItems([...data]));
  }, []);

  // tag::snippet[]
  const renderBoolean = ({
    item,
    original: column,
  }: {
    item: any;
    original: GridColumnElement<UserPermissions>;
  }) => {
    let icon;
    let title;
    let theme;

    if (item[column.id]) {
      icon = 'vaadin:check';
      title = 'Yes';
      theme = 'success';
    } else {
      icon = 'vaadin:close-small';
      title = 'No';
      theme = 'error';
    }

    return (
      <Icon
        aria-label={title}
        icon={icon}
        style={{ padding: 'var(--lumo-space-xs)' }}
        theme={`badge ${theme}`}
        title={title}
      />
    );
  };

  return (
    <Grid items={items}>
      <GridColumn path="name" header="Name" />
      <GridColumn id="view" header="View">
        {renderBoolean}
      </GridColumn>
      <GridColumn id="comment" header="Comment">
        {renderBoolean}
      </GridColumn>
      <GridColumn id="edit" header="Edit">
        {renderBoolean}
      </GridColumn>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
