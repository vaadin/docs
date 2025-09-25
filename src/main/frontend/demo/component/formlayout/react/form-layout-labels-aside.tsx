import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormItem, FormLayout, SplitLayout, TextField } from '@vaadin/react-components';

function Example() {
  function renderFormLayout() {
    // tag::snippet[]
    return (
      <FormLayout className="w-full" autoResponsive labelsAside>
        <FormItem>
          <label slot="label">First name</label>
          <TextField />
        </FormItem>
        <FormItem>
          <label slot="label">Last name</label>
          <TextField />
        </FormItem>
        <FormItem>
          <label slot="label">Email address</label>
          <EmailField />
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
