import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button, HorizontalLayout, RadioButton, RadioGroup } from '@vaadin/react-components';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const theme = useSignal('spacing');

  return (
    <div>
      <HorizontalLayout theme={`${theme.value} padding`} style={{ alignItems: 'stretch' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <RadioGroup
        label="Spacing"
        value={theme.value}
        onValueChanged={(event) => {
          theme.value = event.detail.value;
        }}
      >
        <RadioButton value="spacing" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
