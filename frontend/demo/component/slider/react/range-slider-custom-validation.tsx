import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';
import type { RangeSliderValueChangedEvent } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  // tag::snippet[]
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <RangeSlider
      label="Duration of Stay"
      min={1}
      max={30}
      value={[5, 14]}
      invalid={invalid}
      errorMessage={errorMessage}
      onValueChanged={(e: RangeSliderValueChangedEvent) => {
        const [start, end] = e.detail.value;
        if (end - start < 3) {
          setErrorMessage('The stay must be at least 3 days');
          setInvalid(true);
        } else {
          setInvalid(false);
        }
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
