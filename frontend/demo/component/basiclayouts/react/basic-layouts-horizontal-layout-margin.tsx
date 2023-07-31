import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { RadioButtonGroup } from '@hilla/react-components/RadioButtonGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [theme, setTheme] = useState('margin');

  return (
    <>
      <div className="container">
        <HorizontalLayout theme={`${theme} spacing padding`} style={{ alignItems: 'stretch' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </HorizontalLayout>
      </div>
      <RadioButtonGroup
        label="Margin"
        value={theme}
        onValueChanged={(event) => {
          setTheme(event.detail.value);
        }}
      >
        <RadioButton value="margin" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioButtonGroup>
    </>
  );
}

export default reactExample(Example);
