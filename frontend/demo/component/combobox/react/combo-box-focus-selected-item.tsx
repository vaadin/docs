import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import type { ComboBoxOpenedChangedEvent } from '@vaadin/combo-box';
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox, type ComboBoxElement } from '@vaadin/react-components/ComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  useSignals(); // hidden-source-line
  const comboBoxRef = useRef<ComboBoxElement<Country>>(null);
  const items = useSignal<Country[]>([]);
  const selectedItem = useSignal<Country | undefined>(undefined);

  useEffect(() => {
    getCountries().then((data) => {
      items.value = data;
      selectedItem.value = data.find((c) => c.name === 'United States');
    });
  }, []);

  // tag::snippet[]
  const handleOpenedChanged = (e: ComboBoxOpenedChangedEvent) => {
    const combo = comboBoxRef.current;
    if (e.detail.value && combo?.selectedItem) {
      const index = items.value.indexOf(combo.selectedItem);
      if (index >= 0) {
        combo.scrollToIndex(index);
      }
    }
  };
  // end::snippet[]

  return (
    <ComboBox
      ref={comboBoxRef}
      label="Country"
      itemLabelPath="name"
      itemValuePath="id"
      items={items.value}
      selectedItem={selectedItem.value}
      onOpenedChanged={handleOpenedChanged}
    />
  );
}

export default reactExample(Example); // hidden-source-line
