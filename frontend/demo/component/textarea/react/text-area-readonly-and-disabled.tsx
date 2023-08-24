import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <TextArea readonly label="Read-only" value="Value" style={{ width: '100%' }} />

      <TextArea disabled label="Disabled" style={{ width: '100%' }} />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
