import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import type { RadioGroupValueChangedEvent } from '@hilla/react-components/RadioGroup.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import layoutExampleStyle from './layoutExampleStyle';

function Example() {
  const [theme, setTheme] = useState('padding');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme} spacing`}
        className="height-4xl"
        style={{ alignItems: 'stretch', ...layoutExampleStyle }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

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
