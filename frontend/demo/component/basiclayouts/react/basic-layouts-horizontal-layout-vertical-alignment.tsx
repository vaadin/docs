import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout';
import _layoutExampleStyle from './layoutExampleStyle';

const layoutExampleStyle = {
  ..._layoutExampleStyle,
  height: 'calc(var(--lumo-size-xl) * 4)',
};

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout
      theme="spacing padding"
      className="height-4xl"
      style={{ alignItems: 'center', ...layoutExampleStyle }}
    >
      <TextArea label="Text area 1" />
      <TextArea label="Text area 2" />
      <TextArea label="Text area 3" />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
