import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <EmailField readOnly label="Read-only" value="example@example.com" />

      <EmailField disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example);
