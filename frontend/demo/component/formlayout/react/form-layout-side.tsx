import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    // tag::snippet[]
    <FormLayout>
      {/* Wrap fields into form items, which displays labels on the side by default */}
      <FormItem>
        <label slot="label">Revenue</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>

      <FormItem>
        <label slot="label">Expenses</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>

      <FormItem>
        <label slot="label">Invoices</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>
    </FormLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
