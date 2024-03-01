import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ComboBox } from '@vaadin/react-components';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [items, setItems] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then((data) => setItems(data));
  }, []);

  return (
    // tag::snippet[]
    <ComboBox label="Country" itemLabelPath="name" itemValuePath="id" items={items} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
