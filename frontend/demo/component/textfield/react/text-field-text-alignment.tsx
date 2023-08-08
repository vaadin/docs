import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';

const layoutSteps: FormLayoutResponsiveStep[] = [
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
        <FormItem>
          <label slot="label">Left</label>
          <TextField value="value" />
        </FormItem>

        <FormItem>
          <label slot="label">Center</label>
          <TextField value="value" theme="align-center" />
        </FormItem>

        <FormItem>
          <label slot="label">Right</label>
          {/* tag::snippet[] */}
          <TextField value="value" theme="align-right" />
          {/* end::snippet[] */}
        </FormItem>
      </FormLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
