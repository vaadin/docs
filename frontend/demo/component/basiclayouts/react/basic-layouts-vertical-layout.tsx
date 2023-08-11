import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing padding">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
