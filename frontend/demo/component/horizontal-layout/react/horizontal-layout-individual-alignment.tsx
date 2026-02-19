import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ alignItems: 'stretch' }}
    >
      <div className="example-item" style={{ alignSelf: 'start' }}>
        Item 1
      </div>
      <div className="example-item">Item 2</div>
      <div className="example-item" style={{ alignSelf: 'end' }}>
        Item 3
      </div>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
