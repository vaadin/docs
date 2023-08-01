import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <RadioGroup label="Travel class" theme="vertical">
        <RadioButton value="economy" label="Economy" />
        <RadioButton value="business" label="Business" />
        <RadioButton value="firstClass" label="First Class" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
