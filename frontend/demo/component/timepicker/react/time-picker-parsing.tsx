import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Select label="Locale" />
      <TimePicker label="Time" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
