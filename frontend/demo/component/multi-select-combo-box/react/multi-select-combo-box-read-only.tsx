import React, { useEffect, useState } from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((countries) => setItems(countries));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        label="Countries"
        itemLabelPath="name"
        itemIdPath="id"
        items={items}
        selectedItems={items.slice(0, 4)}
        readonly
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
