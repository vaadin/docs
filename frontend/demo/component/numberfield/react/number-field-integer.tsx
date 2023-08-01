import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { IntegerField } from '@hilla/react-components/IntegerField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing">
        <IntegerField label="X" value="-1284" />

        <IntegerField label="Y" value="3910" />
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
