import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';

function Example() {
  useSignals(); // hidden-source-line
  const size = useSignal('0');

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        <Button style={{ flexGrow: size.value }}>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <RadioGroup
        label="Item sizing"
        value={size.value}
        onValueChanged={(event) => {
          size.value = event.detail.value;
        }}
      >
        <RadioButton value="0" label="Default size" />
        <RadioButton value="1" label="Expand" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
