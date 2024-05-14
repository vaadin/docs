import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Country[]>([]);
  useEffect(() => {
    getCountries().then((data) => {
      items.value = data;
    });
  }, []);

  return (
    // tag::snippet[]
    <ComboBox label="Country" itemLabelPath="name" itemValuePath="id" items={items.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
