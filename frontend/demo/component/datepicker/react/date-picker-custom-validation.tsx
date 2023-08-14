import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  // This is a placeholder file. Binder support for React is not yet implemented. See https://github.com/vaadin/hilla/issues/587
  return <DatePicker label="Meeting date" helperText="Mondays – Fridays only" />;
}

export default reactExample(Example); // hidden-source-line
