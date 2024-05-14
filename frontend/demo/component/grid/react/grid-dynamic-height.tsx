import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';

function renderNoInvitationAlert() {
  return (
    <div
      style={{
        padding: 'var(--lumo-size-l)',
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'var(--lumo-contrast-70pct)',
      }}
    >
      No invitation has been sent
    </div>
  );
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const invitedPeople = useSignal<Person[]>([]);
  const selectedValue = useSignal<string>('');

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  function renderInvitedPeopleTable() {
    return (
      <>
        {/* tag::snippet[] */}
        <Grid items={invitedPeople.value} allRowsVisible>
          <GridColumn header="Name" path="displayName" autoWidth />
          <GridColumn path="email" />
          <GridColumn path="address.phone" />
          <GridColumn header="Manage">
            {({ item: person }) => (
              <Button
                theme="error tertiary icon"
                onClick={() => {
                  invitedPeople.value = invitedPeople.value.filter((p) => p.id !== person.id);
                }}
              >
                <Icon icon="vaadin:trash" />
              </Button>
            )}
          </GridColumn>
        </Grid>
        {/* end::snippet[] */}
      </>
    );
  }

  return (
    <>
      <HorizontalLayout theme="spacing">
        <ComboBox
          items={items.value}
          value={selectedValue.value}
          itemLabelPath="displayName"
          itemValuePath="id"
          style={{ flex: '1' }}
          onValueChanged={(event) => {
            selectedValue.value = event.detail.value;
          }}
        />

        <Button
          theme="primary"
          onClick={() => {
            const person = items.value.find((p) => String(p.id) === selectedValue.value);
            const isInvited = person && invitedPeople.value.some((p) => p.id === person.id);
            if (person && !isInvited) {
              invitedPeople.value = [...invitedPeople.value, person];
              selectedValue.value = '';
            }
          }}
        >
          Send invite
        </Button>
      </HorizontalLayout>

      {invitedPeople.value.length === 0 ? renderNoInvitationAlert() : renderInvitedPeopleTable()}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
