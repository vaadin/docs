import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { NumberField } from '@hilla/react-components/NumberField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <NumberField label="Balance" value="200" prefix={<div slot="prefix">$</div>} />

      <NumberField label="Balance" value="200" suffix={<div slot="suffix">€</div>} />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example);
