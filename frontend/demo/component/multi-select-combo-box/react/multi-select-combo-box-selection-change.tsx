import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import type { SelectedItemsChangedEvent } from '@vaadin/multi-select-combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useState(async () => {
    setItems(await getCountries());
  }, []);

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
        onSelectedItemsChanged={(event: SelectedItemsChangedEvent<Country>) => {
          setSelectedCountries(event.detail.value);
        }}
      />

      <TextArea label="Selected Countries" readonly value={selectedCountriesText} />
    </HorizontalLayout>
  );
}

export default reactExample(Example);
