import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <PasswordField label="Password" value="Ex@mplePassw0rd" revealButtonHidden />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
