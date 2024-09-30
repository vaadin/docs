import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, RadioButton, RadioGroup, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const theme = useSignal('margin');

  return (
    <>
      {/* tag::snippet[] */}
      <div className="container">
        <VerticalLayout theme={`${theme.value} spacing padding`} style={{ alignItems: 'stretch' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </VerticalLayout>
      </div>

      <RadioGroup
        label="Margin"
        value={theme.value}
        onValueChanged={(event) => {
          theme.value = event.detail.value;
        }}
      >
        <RadioButton value="margin" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
