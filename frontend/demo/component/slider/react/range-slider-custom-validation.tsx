import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import type { RangeSliderChangeEvent } from '@vaadin/react-components/RangeSlider.js';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  // tag::snippet[]
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState([200, 800]);

  return (
    <RangeSlider
      label="Price Range"
      min={0}
      max={1000}
      step={50}
      value={value}
      invalid={invalid}
      errorMessage={errorMessage}
      onChange={(e: RangeSliderChangeEvent) => {
        setValue(e.target.value);
        const [start, end] = e.target.value;
        if (end - start < 200) {
          setErrorMessage('Price range must span at least $200');
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
