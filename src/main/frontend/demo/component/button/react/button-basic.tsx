import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const counter = useSignal(0);

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
      <Button onClick={() => counter.value++}>Button</Button>
      <p>Clicked {counter} times</p>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
