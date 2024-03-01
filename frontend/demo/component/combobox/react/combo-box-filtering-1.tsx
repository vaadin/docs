import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState, useEffect } from 'react';
import { ComboBox } from '@vaadin/react-components';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      setItems(countries);
    });
  }, []);

  return (
    // tag::snippet[]
    <ComboBox label="Country" itemLabelPath="name" itemValuePath="id" items={items} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
