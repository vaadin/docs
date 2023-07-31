import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';

export default reactExample(function Example() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getCountries().then((countries) => {
      setItems(countries);
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <MultiSelectComboBox
        label="Countries"
        itemLabelPath="name"
        itemIdPath="id"
        items={items}
        selectedItems={items.slice(0, 4)}
      />
      {/* end::snippet[] */}
    </>
  );
};)