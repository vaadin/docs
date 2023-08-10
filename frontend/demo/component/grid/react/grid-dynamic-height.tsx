import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
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
  const [items, setItems] = useState<Person[]>([]);
  const [invitedPeople, setInvitedPeople] = useState<Person[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  function renderInvitedPeopleTable() {
    return (
      <>
        {/* tag::snippet[] */}
        <Grid items={invitedPeople} allRowsVisible>
          <GridColumn header="Name" path="displayName" autoWidth />
          <GridColumn path="email" />
          <GridColumn path="address.phone" />
          <GridColumn header="Manage">
            {({ item: person }) => (
              <Button
                theme="error tertiary icon"
                onClick={() => {
                  setInvitedPeople(invitedPeople.filter((p) => p.id !== person.id));
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
          items={items}
          value={selectedValue}
          itemLabelPath="displayName"
          itemValuePath="id"
          style={{ flex: '1' }}
          onValueChanged={(event) => {
            setSelectedValue(event.detail.value);
          }}
        />

        <Button
          theme="primary"
          onClick={() => {
            const person = items.find((p) => String(p.id) === selectedValue);
            const isInvited = person && invitedPeople.some((p) => p.id === person.id);
            if (person && !isInvited) {
              setInvitedPeople([...invitedPeople, person]);
              setSelectedValue('');
            }
          }}
        >
          Send invite
        </Button>
      </HorizontalLayout>

      {invitedPeople.length === 0 ? renderNoInvitationAlert() : renderInvitedPeopleTable()}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
