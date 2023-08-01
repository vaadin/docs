import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((countries) => {
      setItems(countries);
    });
  }, []);

  const i18n = {
    cleared: 'Alle Einträge entfernt',
    focused: ' ausgewählt. Drücke Rücktaste zum Entfernen',
    selected: ' hinzugefügt',
    deselected: ' entfernt',
    total: '{count} Einträge ausgewählt',
  };

  return (
    <>
      {/* tag::snippet[] */}
      <MultiSelectComboBox
        label="Länder"
        itemLabelPath="name"
        itemIdPath="id"
        items={items}
        i18n={i18n}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
