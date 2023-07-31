import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';

const layoutSteps = [
  {
    minWidth: 0,
    columns: 1,
    labelsPosition: 'aside',
  },
];

function Example() {
  return (
    <>
      <FormLayout responsiveSteps={layoutSteps}>
        <FormItem label="Left">
          <TextField value="value" />
        </FormItem>

        <FormItem label="Center">
          <TextField value="value" theme="align-center" />
        </FormItem>

        <FormItem label="Right">
          {/* tag::snippet[] */}
          <TextField value="value" theme="align-right" />
          {/* end::snippet[] */}
        </FormItem>
      </FormLayout>
    </>
  );
}

export default reactExample(Example);
