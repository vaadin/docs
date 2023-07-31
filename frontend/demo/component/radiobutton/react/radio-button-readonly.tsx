import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { RadioButtonGroup } from '@hilla/react-components/RadioButtonGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <RadioButtonGroup label="Status" readonly>
        <RadioButton value="inProgress" label="In progress" checked />
        <RadioButton value="done" label="Done" />
        <RadioButton value="cancelled" label="Cancelled" />
      </RadioButtonGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
