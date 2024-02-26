import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      items.value = countries;
    });
  }, []);

  // tag::snippet[]
  const i18n = {
    cleared: 'Alle Einträge entfernt',
    focused: ' ausgewählt. Drücke Rücktaste zum Entfernen',
    selected: ' hinzugefügt',
    deselected: ' entfernt',
    total: '{count} Einträge ausgewählt',
  };

  return (
    <MultiSelectComboBox
      label="Länder"
      itemLabelPath="name"
      itemIdPath="id"
      items={items.value}
      i18n={i18n}
      style={{ width: '300px' }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
