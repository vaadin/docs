import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, IntegerField } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
      {/* tag::snippet[] */}
      <IntegerField label="X" value="-1284" />

      <IntegerField label="Y" value="3910" />
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
