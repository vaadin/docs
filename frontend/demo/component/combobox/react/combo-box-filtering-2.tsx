import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ComboBox, type ComboBoxFilterChangedEvent } from '@vaadin/react-components';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [allItems, setAllItems] = useState<Country[]>([]);
  const [filteredItems, setFilteredItems] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      setAllItems(countries);
      setFilteredItems(countries);
    });
  }, []);

  function filterChanged(event: ComboBoxFilterChangedEvent) {
    const filter = event.detail.value;
    setFilteredItems(
      allItems.filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()))
    );
  }

  return (
    // tag::snippet[]
    <ComboBox
      label="Country"
      itemLabelPath="name"
      itemValuePath="id"
      filteredItems={filteredItems}
      onFilterChanged={filterChanged}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
