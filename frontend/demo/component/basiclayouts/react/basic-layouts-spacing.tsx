import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { Button } from '@vaadin/react-components/Button.js';
import {
  RadioGroup,
  type RadioGroupValueChangedEvent,
} from '@vaadin/react-components/RadioGroup.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';

function Example() {
  useSignals(); // hidden-source-line
  const theme = useSignal('spacing');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme.value} padding`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

      <RadioGroup
        label="Spacing"
        value={theme.value}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          theme.value = event.detail.value;
        }}
      >
        <RadioButton value="spacing" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
