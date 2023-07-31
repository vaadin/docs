import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <FormLayout>
        <FormItem label="Revenue">
          <input type="text" />
        </FormItem>
      </FormLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
