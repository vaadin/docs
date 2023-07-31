import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';

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

export default reactExample(Example);
