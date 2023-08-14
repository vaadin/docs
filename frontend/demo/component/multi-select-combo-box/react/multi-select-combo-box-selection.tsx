import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((countries) => setItems(countries));
  }, []);

  return (
    <MultiSelectComboBox
      label="Countries"
      itemLabelPath="name"
      itemIdPath="id"
      items={items}
      selectedItems={items.slice(0, 4)}
      style={{ width: '300px' }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
