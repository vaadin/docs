import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  return <DatePicker label="Meeting date" helperText="Mondays – Fridays only" />;
}

export default reactExample(Example); // hidden-source-line
