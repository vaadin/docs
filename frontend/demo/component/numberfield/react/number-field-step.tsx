import React from 'react';
import { NumberField } from '@vaadin/react-components/NumberField.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <NumberField label="Duration (hours)" step={0.5} value="12.5" stepButtonsVisible />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
