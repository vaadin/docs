import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

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

export default reactExample(Example);
