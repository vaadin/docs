import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { RadioButtonGroup } from '@hilla/react-components/RadioButtonGroup.js';
import type { RadioButtonGroupValueChangedEvent } from '@hilla/react-components/RadioButtonGroup.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  const [theme, setTheme] = useState('padding');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme} spacing`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>
      <RadioButtonGroup
        label="Padding"
        value={theme}
        onValueChanged={(event: RadioButtonGroupValueChangedEvent) => {
          setTheme(event.detail.value);
        }}
      >
        <RadioButtonGroup.CustomButton value="padding" label="Enabled" />
        <RadioButtonGroup.CustomButton value="" label="Disabled" />
      </RadioButtonGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
