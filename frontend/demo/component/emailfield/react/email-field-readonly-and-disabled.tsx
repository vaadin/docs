import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormLayout } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
      {/* tag::snippet[] */}
      <EmailField readonly label="Read-only" value="example@example.com" />

      <EmailField disabled label="Disabled" />
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
