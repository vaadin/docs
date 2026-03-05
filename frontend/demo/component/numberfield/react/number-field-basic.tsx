import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, NumberField } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
      {/* tag::snippet[] */}
      <NumberField label="Balance" value="200">
        <div slot="prefix">$</div>
      </NumberField>

      <NumberField label="Balance" value="200">
        <div slot="suffix">€</div>
      </NumberField>
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
