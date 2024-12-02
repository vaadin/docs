import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  HorizontalLayout,
  RadioButton,
  RadioGroup,
  type RadioGroupValueChangedEvent,
} from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line

  return (
    <>
      <HorizontalLayout
        theme="spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </HorizontalLayout>
      {/* tag::snippet[] */}
      <HorizontalLayout
        theme="wrap spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
