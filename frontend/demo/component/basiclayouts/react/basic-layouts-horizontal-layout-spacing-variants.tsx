import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React, { useState } from 'react';
import { Button, HorizontalLayout, RadioButton, RadioGroup } from '@vaadin/react-components';

function Example() {
  const [themeVariant, setThemeVariant] = useState('spacing-xl');

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme={`${themeVariant} padding`} style={{ alignItems: 'stretch' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>
      <RadioGroup
        label="Spacing variant"
        value={themeVariant}
        onValueChanged={(event) => setThemeVariant(event.detail.value)}
      >
        <RadioButton value="spacing-xs" label="spacing-xs" />
        <RadioButton value="spacing-s" label="spacing-s" />
        <RadioButton value="spacing" label="spacing" />
        <RadioButton value="spacing-l" label="spacing-l" />
        <RadioButton value="spacing-xl" label="spacing-xl" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
