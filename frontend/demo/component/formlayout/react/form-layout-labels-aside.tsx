import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  Button,
  Checkbox,
  EmailField,
  FormItem,
  FormLayout,
  PasswordField,
  SplitLayout,
} from '@vaadin/react-components';

function Example() {
  function renderFormLayout() {
    // tag::snippet[]
    return (
      <FormLayout style={{ width: '100%' }} autoResponsive labelsAside>
        <EmailField label="Email" />
        <PasswordField label="Password" />
        <Checkbox label="Subscribe" />
        <FormItem>
          <Button style={{ width: '100%' }}>Register</Button>
        </FormItem>
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
