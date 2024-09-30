import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <ComboBox readonly label="Read-only" items={['Value']} value="Value" />

      <ComboBox disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
