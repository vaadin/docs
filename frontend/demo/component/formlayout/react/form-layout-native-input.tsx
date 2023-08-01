import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <FormLayout>
        <FormItem>
          <label slot="label">Revenue</label>
          <input type="text" />
        </FormItem>
      </FormLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
