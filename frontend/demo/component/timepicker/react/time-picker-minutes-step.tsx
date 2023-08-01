import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker label="Meeting time" value="12:30" step={60 * 30} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
