import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Country[]>([]);
  const collapseChips = useSignal(true);
  const selectedCountries = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      items.value = countries;
      selectedCountries.value = countries.slice(0, 3);
    });
  }, []);

  return (
    <VerticalLayout theme="spacing">
      {/* tag::snippet[] */}
      <MultiSelectComboBox
        label="Countries"
        itemLabelPath="name"
        itemIdPath="id"
        itemValuePath="id"
        items={items.value}
        collapseChips={collapseChips.value}
        selectedItems={selectedCountries.value}
        onSelectedItemsChanged={(event) => {
          selectedCountries.value = event.detail.value;
        }}
        style={{ width: '250px' }}
      />
      {/* end::snippet[] */}
      <Checkbox
        label="Collapse chips"
        checked={collapseChips.value}
        onChange={(e) => {
          collapseChips.value = e.target.checked;
        }}
      />
    </VerticalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
