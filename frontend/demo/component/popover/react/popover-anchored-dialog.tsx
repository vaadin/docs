import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridColumn,
  HorizontalLayout,
  Icon,
  Popover,
} from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

type ColumnConfig = { label: string; key: string; visible: boolean };

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { label: 'First name', key: 'firstName', visible: true },
  { label: 'Last name', key: 'lastName', visible: true },
  { label: 'Email', key: 'email', visible: true },
  { label: 'Phone', key: 'address.phone', visible: false },
  { label: 'Birthday', key: 'birthday', visible: false },
  { label: 'Profession', key: 'profession', visible: true },
];

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const columns = useSignal<ColumnConfig[]>([...DEFAULT_COLUMNS]);
  const visibleColumns = useComputed(() =>
    columns.value.filter((column) => column.visible).map((column) => column.key)
  );

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <>
      <HorizontalLayout style={{ alignItems: 'baseline' }}>
        <h3 style={{ flex: 1 }}>Employees</h3>
        <Button id="toggle-columns" theme="icon" aria-label="Show / hide columns">
          <Icon icon="vaadin:grid-h" />
        </Button>
      </HorizontalLayout>

      {/* tag::snippet[] */}
      <Popover for="toggle-columns" modal withBackdrop position="bottom-end">
        <div style={{ fontWeight: '600', padding: '0.25rem' }}>Configure columns</div>
        <CheckboxGroup theme="vertical" value={visibleColumns.value}>
          {columns.value.map((item) => (
            <Checkbox
              label={item.label}
              value={item.key}
              onChange={(event) => {
                const idx = columns.value.findIndex(({ key }) => key === event.target.value);
                columns.value = columns.value.map((column, index) => ({
                  ...column,
                  visible: idx === index ? event.target.checked : column.visible,
                }));
              }}
            />
          ))}
        </CheckboxGroup>
        <HorizontalLayout style={{ justifyContent: 'space-between' }}>
          <Button
            theme="small"
            onClick={() => {
              columns.value = columns.value.map((column) => ({ ...column, visible: true }));
            }}
          >
            Show all
          </Button>
          <Button
            theme="small"
            onClick={() => {
              columns.value = columns.value.map((column, idx) => ({
                ...column,
                visible: DEFAULT_COLUMNS[idx].visible,
              }));
            }}
          >
            Reset
          </Button>
        </HorizontalLayout>
      </Popover>
      {/* end::snippet[] */}

      {/* tag::gridsnippet[] */}
      <Grid items={items.value}>
        {columns.value.map((item) => (
          <GridColumn path={item.key} hidden={!item.visible} key={item.key} />
        ))}
      </Grid>
      {/* end::gridsnippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
