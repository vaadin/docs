import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  return (
    <RadioGroup label="Repeat" theme="vertical" value="none">
      <RadioButton value="none" label="None" checked />
      <RadioButton value="daily" label="Daily" />
      <RadioButton value="weekly" label="Weekly" />
      <RadioButton value="monthly" label="Monthly" />
    </RadioGroup>
  );
}

export default reactExample(Example); // hidden-source-line
