import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      items.value = countries;
    });
  }, []);

  const selectedItems = useComputed(() => items.value.slice(0, 4));

  return (
    // tag::snippet[]
    <MultiSelectComboBox
      label="Countries"
      itemLabelPath="name"
      itemIdPath="id"
      items={items.value}
      autoExpandHorizontally
      autoExpandVertically
      selectedItems={selectedItems.value}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
