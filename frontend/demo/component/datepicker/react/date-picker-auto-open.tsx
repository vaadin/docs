import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <DatePicker label="Start date" autoOpenDisabled />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
