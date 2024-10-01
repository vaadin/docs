import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
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

  // tag::snippet[]
  const selectedCountries = useSignal<Country[]>([]);
  const selectedCountriesText = selectedCountries.value.map((country) => country.name).join(', ');

  return (
    <HorizontalLayout theme="spacing">
      <MultiSelectComboBox
        label="Countries"
        itemLabelPath="name"
        itemIdPath="id"
        items={items.value}
        selectedItems={selectedCountries.value}
        onSelectedItemsChanged={(event) => {
          selectedCountries.value = event.detail.value;
        }}
      />

      <TextArea label="Selected Countries" readonly value={selectedCountriesText} />
    </HorizontalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
