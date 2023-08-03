import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  // tag::snippet[]
  const responsiveSteps = [
    // Use one column by default
    { minWidth: '0', columns: 1 },
    // Use two columns, if the layout's width exceeds 320px
    { minWidth: '320px', columns: 2 },
    // Use three columns, if the layout's width exceeds 500px
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
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
