import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import type { RangeSliderChangeEvent } from '@vaadin/react-components/RangeSlider.js';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const currentValue = useSignal<number[]>([200, 800]);
  const errorMessage = useSignal('');
  const invalid = useSignal(false);

  return (
    <RangeSlider
      label="Price Range"
      min={0}
      max={1000}
      step={50}
      value={currentValue.value}
      invalid={invalid.value}
      errorMessage={errorMessage.value}
      onChange={(e: RangeSliderChangeEvent) => {
        currentValue.value = e.target.value;
        const [start, end] = e.target.value;
        if (end - start < 200) {
          errorMessage.value = 'Price range must span at least $200';
          invalid.value = true;
        } else {
          errorMessage.value = '';
          invalid.value = false;
        }
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
