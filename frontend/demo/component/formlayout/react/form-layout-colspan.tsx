import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, FormRow, SplitLayout, TextField } from '@vaadin/react-components';

function Example() {
  function renderFormLayout() {
    // tag::snippet[]
    return (
      <FormLayout className="w-full" autoResponsive columnWidth="8em" expandFields>
        <FormRow>
          <TextField label="Street address" data-colspan="3" />
        </FormRow>
        <FormRow>
          <TextField label="Postal code" />
          <TextField label="City/Town" data-colspan="2" />
        </FormRow>
        <FormRow>
          <TextField label="Country" data-colspan="2" />
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
