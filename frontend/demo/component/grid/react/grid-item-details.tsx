import { reactExample } from 'Frontend/demo/react-example';
import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { getPeople } from 'Frontend/demo/domain/DataService.js';

function Example() {
  const [items, setItems] = useState([]);
  const [detailsOpenedItem, setDetailsOpenedItem] = useState([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      );
    });
  }, []);

  return (
    <>
      <Grid
        theme="row-stripes"
        items={items}
        detailsOpenedItems={detailsOpenedItem}
        onActiveItemChanged={({ detail: { value } }) => {
          setDetailsOpenedItem(value ? [value] : []);
        }}
      >
        {(person) => (
          <>
            <GridColumn path="displayName" header="Name" />

            <GridColumn path="profession" />

            {!!detailsOpenedItem.includes(person) && (
              <GridColumn>
                {() => (
                  <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3 }]}>
                    <TextField label="Email address" value={person.email} colspan={3} readonly />

                    <TextField
                      label="Phone number"
                      value={person.address.phone}
                      colspan={3}
                      readonly
                    />

                    <TextField
                      label="Street address"
                      value={person.address.street}
                      colspan={3}
                      readonly
                    />

                    <TextField label="ZIP code" value={person.address.zip} readonly />

                    <TextField label="City" value={person.address.city} readonly />

                    <TextField label="State" value={person.address.state} readonly />
                  </FormLayout>
                )}
              </GridColumn>
            )}
          </>
        )}
      </Grid>
    </>
  );
}

export default reactExample(Example);
