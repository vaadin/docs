import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      items.value = countries;
    });
  }, []);

  return (
    // tag::snippet[]
    <MultiSelectComboBox
      label="Countries"
      itemLabelPath="name"
      itemIdPath="id"
      items={items.value}
      selectedItems={items.value.slice(0, 4)}
      readonly
      style={{ width: '300px' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
