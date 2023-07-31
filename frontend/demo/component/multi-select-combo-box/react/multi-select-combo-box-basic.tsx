// The resulting React code should be as follows:

import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => setItems(countries));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <MultiSelectComboBox label="Countries" itemLabelPath="name" itemIdPath="id" items={items} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
