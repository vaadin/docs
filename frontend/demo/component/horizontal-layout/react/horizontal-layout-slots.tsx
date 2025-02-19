import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing padding">
      <div className="example-item">Start</div>
      <div className="example-item" slot="middle">
        Middle
      </div>
      <div className="example-item" slot="end">
        End
      </div>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
