import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker label="Message received" value="15:45:08" step={1} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
