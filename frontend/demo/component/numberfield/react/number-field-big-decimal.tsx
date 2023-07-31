import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { BigDecimalField } from '@hilla/react-components/BigDecimalField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <BigDecimalField label="Number:" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
