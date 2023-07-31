import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <DatePicker label="Start date" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
