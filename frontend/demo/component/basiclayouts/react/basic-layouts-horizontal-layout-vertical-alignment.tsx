import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react';
import { TextArea } from '@vaadin/react-components';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ alignItems: 'center' }}
    >
      <TextArea label="Text area 1" />
      <TextArea label="Text area 2" />
      <TextArea label="Text area 3" />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
