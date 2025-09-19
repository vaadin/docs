import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox, type ComboBoxFilterChangedEvent } from '@vaadin/react-components/ComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  useSignals(); // hidden-source-line
  const allItems = useSignal<Country[]>([]);
  const filteredItems = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      allItems.value = countries;
      filteredItems.value = countries;
    });
  }, []);

  function filterChanged(event: ComboBoxFilterChangedEvent) {
    const filter = event.detail.value;
    filteredItems.value = allItems.value.filter(({ name }) =>
      name.toLowerCase().startsWith(filter.toLowerCase())
    );
  }

  return (
    // tag::snippet[]
    <ComboBox
      label="Country"
      itemLabelPath="name"
      itemValuePath="id"
      filteredItems={filteredItems.value}
      onFilterChanged={filterChanged}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
