import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  EmailField,
  FormLayout,
  FormRow,
  PasswordField,
  SplitLayout,
  TextField,
} from '@vaadin/react-components';

function Example() {
  function renderFormLayout() {
    // tag::snippet[]
    return (
      <FormLayout className="w-full" autoResponsive columnWidth="8em" expandColumns expandFields>
        <FormRow>
          <TextField label="First name" />
          <TextField label="Last name" />
        </FormRow>
        <FormRow>
          <EmailField label="Email address" />
        </FormRow>
        <FormRow>
          <PasswordField label="Password" />
          <PasswordField label="Confirm password" />
        </FormRow>
      </FormLayout>
    );
    // end::snippet[]
  }

  return (
    <SplitLayout>
      {renderFormLayout()}
      <div></div>
    </SplitLayout>
  );
}

export default reactExample(Example); // hidden-source-line
