import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing padding">
      <VerticalLayout style={{ marginRight: 'auto' }} theme="spacing padding">
        <div className="example-item">Start</div>
        <div className="example-item">Start</div>
      </VerticalLayout>
      <VerticalLayout theme="spacing padding">
        <div className="example-item">Middle</div>
      </VerticalLayout>
      <VerticalLayout style={{ marginLeft: 'auto' }} theme="spacing padding">
        <div className="example-item">End</div>
        <div className="example-item">End</div>
      </VerticalLayout>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
