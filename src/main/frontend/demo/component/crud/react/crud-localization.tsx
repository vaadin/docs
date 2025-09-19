import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Crud, crudPath } from '@vaadin/react-components-pro/Crud.js';
import { CrudEditColumn } from '@vaadin/react-components-pro/CrudEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
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
      items={items.value}
      i18n={i18n}
    >
      <Grid slot="grid">
        <GridColumn path="firstName" header="Etunimi" />
        <GridColumn path="lastName" header="Sukunimi" />
        <GridColumn path="email" header="Sähköposti" />
        <GridColumn path="profession" header="Ammatti" />
        <CrudEditColumn />
      </Grid>

      <div slot="form">
        <TextField {...crudPath('firstName')} label="Etunimi" required />
        <TextField {...crudPath('lastName')} label="Sukunimi" required />
        <EmailField {...crudPath('email')} label="Sähköposti" required />
        <ComboBox
          {...crudPath('profession')}
          label="Ammatti"
          items={[...new Set(items.value.map((i) => i.profession))]}
        />
      </div>
    </Crud>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
