import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <PasswordField
        theme="align-right small helper-above-field"
        label="Label"
        helperText="Helper text"
        value="Ex@mplePassw0rd"
        style={{ '--vaadin-input-field-border-width': '1px' }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
