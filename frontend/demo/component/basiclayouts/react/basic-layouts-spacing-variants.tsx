import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import type { RadioGroupValueChangedEvent } from '@hilla/react-components/RadioGroup';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import layoutExampleStyle from './layoutExampleStyle';

function Example() {
  const [themeVariant, setThemeVariant] = useState('spacing-xl');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${themeVariant} padding`}
        className="height-4xl"
        style={{ alignItems: 'stretch', ...layoutExampleStyle }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

      <RadioGroup
        label="Spacing variant"
        value={themeVariant}
        onValueChanged={(event: RadioGroupValueChangedEvent) => setThemeVariant(event.detail.value)}
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

export default reactExample(Example); // hidden-source-line
