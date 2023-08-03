import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Crud } from '@hilla/react-components/Crud.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import React, { useEffect, useState } from 'react';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  // tag::snippet[]
  const i18n = {
    newItem: 'Luo uusi',
    editItem: 'Muuta tietoja',
    saveItem: 'Tallenna',
    cancel: 'Peruuta',
    deleteItem: 'Poista...',
    editLabel: 'Muokkaa',
    confirm: {
      delete: {
        title: 'Poista kohde',
        content: 'Haluatko varmasti poistaa tämän kohteen? Poistoa ei voi perua.',
        button: {
          confirm: 'Poista',
          dismiss: 'Peruuta',
        },
      },
      cancel: {
        title: 'Hylkää muutokset',
        content: 'Kohteessa on tallentamattomia muutoksia',
        button: {
          confirm: 'Hylkää',
          dismiss: 'Peruuta',
        },
      },
    },
  };

  return (
    <Crud
      editorPosition="aside"
      include="firstName, lastName, email, profession"
      items={items}
      i18n={i18n}
    >
      <Grid slot="grid">
        <GridColumn path="firstName" header="Etunimi" />
        <GridColumn path="lastName" header="Sukunimi" />
        <GridColumn path="email" header="Sähköposti" />
        <GridColumn path="profession" header="Ammatti" />
      </Grid>

      <div slot="form">
        <TextField {...{ path: 'firstName' }} label="Etunimi" required />
        <TextField {...{ path: 'lastName' }} label="Sukunimi" required />
        <EmailField {...{ path: 'email' }} label="Sähköposti" required />
        <ComboBox
          {...{ path: 'profession' }}
          label="Ammatti"
          items={[...new Set(items.map((i) => i.profession))]}
        />
      </div>
    </Crud>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
