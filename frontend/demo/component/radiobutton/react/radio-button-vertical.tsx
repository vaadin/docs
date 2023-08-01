import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <RadioGroup label="Status" theme="vertical">
        <RadioButton value="pending" label="Pending" checked />
        <RadioButton value="submitted" label="Submitted" />
        <RadioButton value="confirmed" label="Confirmed" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
