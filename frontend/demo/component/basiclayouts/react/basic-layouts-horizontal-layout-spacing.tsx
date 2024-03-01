import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React, { useState } from 'react';
import { Button, HorizontalLayout, RadioButton, RadioGroup } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  const [theme, setTheme] = useState('spacing');

  return (
    <div>
      <HorizontalLayout theme={`${theme} padding`} style={{ alignItems: 'stretch' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <RadioGroup
        label="Spacing"
        value={theme}
        onValueChanged={(event) => setTheme(event.detail.value)}
      >
        <RadioButton value="spacing" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
