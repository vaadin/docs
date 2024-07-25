import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button, RadioButton, RadioGroup, VerticalLayout } from '@vaadin/react-components';
import type { RadioGroupValueChangedEvent } from '@vaadin/react-components/RadioGroup.js';

function Example() {
  useSignals(); // hidden-source-line
  const theme = useSignal('padding');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme.value} spacing`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

      <RadioGroup
        label="Padding"
        value={theme.value}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          theme.value = event.detail.value;
        }}
      >
        <RadioButton value="padding" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
