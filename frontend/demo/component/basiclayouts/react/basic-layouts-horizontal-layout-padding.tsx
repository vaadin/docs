import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import {
  RadioGroup,
  type RadioGroupValueChangedEvent,
} from '@hilla/react-components/RadioGroup.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import layoutExampleStyle from './layoutExampleStyle';

function Example() {
  const [theme, setTheme] = useState('padding');

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout
        theme={`${theme} spacing`}
        style={{ alignItems: 'stretch', ...layoutExampleStyle }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>
      <RadioGroup
        label="Padding"
        value={theme}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          setTheme(event.detail.value);
        }}
      >
        <RadioButton value="padding" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
