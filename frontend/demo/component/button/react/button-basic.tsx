import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  const [counter, setCounter] = useState(0);

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
      <Button onClick={() => setCounter(counter + 1)}>Button</Button>
      <p>Clicked {counter} times</p>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
