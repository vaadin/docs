import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  const [size, setSize] = useState('0');

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        <Button style={{ flexGrow: size }}>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <RadioGroup
        label="Item sizing"
        value={size}
        onValueChanged={(event) => setSize(event.detail.value)}
      >
        <RadioButton value="0" label="Default size" />
        <RadioButton value="1" label="Expand" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
