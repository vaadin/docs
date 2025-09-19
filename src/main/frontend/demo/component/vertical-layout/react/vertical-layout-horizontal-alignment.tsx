import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing padding" style={{ alignItems: 'center' }}>
      <div className="example-item">Item 1</div>
      <div className="example-item">Item 2</div>
      <div className="example-item">Item 3</div>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
