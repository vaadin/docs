import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';

function Example() {
  const items = useSignal<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      items.value = countries;
    });
  }, []);

  return (
    // tag::snippet[]
    <ComboBox
      autoOpenDisabled
      label="Country"
      itemLabelPath="name"
      itemValuePath="id"
      items={items.value}
    ></ComboBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
