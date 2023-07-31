import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { IntegerField } from '@hilla/react-components/IntegerField';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <IntegerField
        label="Quantity"
        helperText="Max 10 items"
        min={0}
        max={10}
        value={2}
        stepButtonsVisible
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
