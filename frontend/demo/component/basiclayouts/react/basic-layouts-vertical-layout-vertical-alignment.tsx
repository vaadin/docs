import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react';
import { Button, VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ justifyContent: 'center' }}
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
