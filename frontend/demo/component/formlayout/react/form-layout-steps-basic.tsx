import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormLayout, SplitLayout, TextField } from '@vaadin/react-components';

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

  function renderFormLayout() {
    return (
      <FormLayout responsiveSteps={responsiveSteps}>
        <TextField label="First name" />
        <TextField label="Last name" />
        <EmailField label="Email address" />
      </FormLayout>
    );
  }
  // end::snippet[]

  return (
    <SplitLayout>
      {renderFormLayout()}
      <div></div>
    </SplitLayout>
  );
}

export default reactExample(Example); // hidden-source-line
