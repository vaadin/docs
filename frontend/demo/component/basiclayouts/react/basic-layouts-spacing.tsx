import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { RadioGroup, RadioGroupValueChangedEvent } from '@hilla/react-components/RadioGroup.js';

function Example() {
  const [theme, setTheme] = useState('spacing');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme} padding`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>
      <RadioGroup
        label="Spacing"
        value={theme}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          setTheme(event.detail.value);
        }}
      >
        <input type="radio" value="spacing" as="vaadin-radio-button" label="Enabled" />
        <input type="radio" value="" as="vaadin-radio-button" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
