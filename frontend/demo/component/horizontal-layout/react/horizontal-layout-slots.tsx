import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing padding">
      <div className="example-item" style={{ marginRight: 'auto' }}>
        Start
      </div>
      <div className="example-item">Middle</div>
      <div className="example-item" style={{ marginLeft: 'auto' }}>
        End
      </div>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
