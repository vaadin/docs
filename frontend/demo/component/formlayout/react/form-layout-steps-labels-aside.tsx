import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormItem, FormLayout, SplitLayout, TextField } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  // This is the default configuration shown for demonstration purposes
  // const responsiveSteps: FormLayoutResponsiveStep[] = [
  //   { minWidth: 0, columns: 1, labelsPosition: 'top' },
  //   { minWidth: '20em', columns: 1 },
  //   { minWidth: '40em', columns: 2 },
  // ];

  function renderFormLayout() {
    return (
      <FormLayout style={{ '--vaadin-form-item-label-width': '92px' }}>
        {/* Wrap fields into form items, which displays labels on the side by default */}
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
