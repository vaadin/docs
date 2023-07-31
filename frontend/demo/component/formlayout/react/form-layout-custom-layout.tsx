import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  const responsiveSteps = [
    { minWidth: 0, columns: 1 },
    { minWidth: '320px', columns: 2 },
    { minWidth: '500px', columns: 3 },
  ];

  return (
    <SplitLayout>
      <FormLayout responsiveSteps={responsiveSteps}>
        <TextField label="First name" />
        <TextField label="Last name" />
        <EmailField label="Email" />
      </FormLayout>
      <div></div>
    </SplitLayout>
  );
}

export default reactExample(Example);
