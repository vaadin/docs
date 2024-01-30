import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((countries) => setItems(countries));
  }, []);

  // tag::snippet[]
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const selectedCountriesText = selectedCountries.map((country) => country.name).join(', ');

  return (
    <HorizontalLayout theme="spacing">
      <MultiSelectComboBox
        label="Countries"
        itemLabelPath="name"
        itemIdPath="id"
        items={items}
        selectedItems={selectedCountries}
        onSelectedItemsChanged={(event) => {
          setSelectedCountries(event.detail.value);
        }}
      />

      <TextArea label="Selected Countries" readonly value={selectedCountriesText} />
    </HorizontalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
