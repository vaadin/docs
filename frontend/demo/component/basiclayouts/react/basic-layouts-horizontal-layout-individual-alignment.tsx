import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';

// tag::snippet[]
function Example() {
  return (
    <>
      <HorizontalLayout
        theme="spacing padding"
        className="height-4xl" // hidden-source-line
        style={{ alignItems: 'stretch' }}
      >
        <TextArea label="Text area 1" style={{ alignSelf: 'start' }} />
        <TextArea label="Text area 2" />
        <TextArea label="Text area 3" style={{ alignSelf: 'end' }} />
      </HorizontalLayout>
    </>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
