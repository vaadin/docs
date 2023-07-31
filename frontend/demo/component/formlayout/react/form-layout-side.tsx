import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <FormLayout>
        <FormItem label="Revenue">
          <TextField suffix="EUR" />
        </FormItem>
        <FormItem label="Expenses">
          <TextField suffix="EUR" />
        </FormItem>
        <FormItem label="Invoices">
          <TextField suffix="EUR" />
        </FormItem>
      </FormLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
