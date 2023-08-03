import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((countries) => setItems(countries));
  }, []);

  return (
    // tag::snippet[]
    <MultiSelectComboBox
      label="Countries"
      itemLabelPath="name"
      itemIdPath="id"
      items={items}
      selectedItems={items.slice(0, 4)}
      readonly
      style={{ width: '300px' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
