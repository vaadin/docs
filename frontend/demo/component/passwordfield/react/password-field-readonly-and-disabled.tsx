import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, PasswordField } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
      {/* tag::snippet[] */}
      <PasswordField readonly label="Read-only" value="Ex@mplePassw0rd" />

      <PasswordField disabled label="Disabled" />
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
