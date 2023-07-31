import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [filteredItems, setFilteredItems] = useState([]);

  const [items, setItems] = useState([]);

  /* BEGIN: firstUpdated */
  React.useEffect(() => {
    getPeople().then(({ people }) => {
      const items = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
      setItems(items);
      setFilteredItems(items);
    });
  }, []);
  /* END: firstUpdated */

  /* BEGIN: TextField valueChanged */
  const handleTextFieldValueChanged = (event) => {
    const searchTerm = (event.detail || '').trim();
    const matchesTerm = (value) => value.toLowerCase().includes(searchTerm.toLowerCase());

    const filtered = items.filter(
      ({ displayName, email, profession }) =>
        !searchTerm || matchesTerm(displayName) || matchesTerm(email) || matchesTerm(profession)
    );

    setFilteredItems(filtered);
  };
  /* END: TextField valueChanged */

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <TextField
          placeholder="Search"
          style={{ width: '50%' }}
          // BEGIN: TextField event
          onValueChanged={handleTextFieldValueChanged}
          // END: TextField event
        >
          <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
        </TextField>

        <Grid items={filteredItems}>
          <GridColumn
            header="Name"
            flexGrow={0}
            width="230px"
            // BEGIN: gridColumn render
            render={({ item }) => (
              <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
                <Avatar img={item.pictureUrl} name={item.displayName} />
                <span>{item.displayName}</span>
              </HorizontalLayout>
            )}
            // END: gridColumn render
          />

          <GridColumn path="email" />

          <GridColumn path="profession" />
        </Grid>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
