import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker label="Alarm" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
