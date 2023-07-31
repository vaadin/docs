import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { RadioGroup, RadioGroupValueChangedEvent } from '@vaadin/react-components/RadioGroup.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  const [theme, setTheme] = useState('padding');

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme={`${theme} spacing`} style={{ alignItems: 'stretch' }}>
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
        <vaadin-radio-button value="padding" label="Enabled" />
        <vaadin-radio-button value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
