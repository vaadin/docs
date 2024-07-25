import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react';
import { HorizontalLayout, TextArea } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ alignItems: 'stretch', ...layoutExampleStyle }}
    >
      <TextArea label="Text area 1" style={{ alignSelf: 'start' }} />
      <TextArea label="Text area 2" />
      <TextArea label="Text area 3" style={{ alignSelf: 'end' }} />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
