import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import _layoutExampleStyle from './layoutExampleStyle';

const layoutExampleStyle = {
  ..._layoutExampleStyle,
  height: 'calc(var(--lumo-size-xl) * 4)',
};

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ justifyContent: 'center', ...layoutExampleStyle }}
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
