import React from 'react';
import { FormItem } from '@vaadin/react-components/FormItem.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <FormLayout>
      <FormItem>
        <label slot="label">Revenue</label>
        <input type="text" />
      </FormItem>
    </FormLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
