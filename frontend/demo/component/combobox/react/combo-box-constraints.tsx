import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        required
        charPattern="[A-Z]"
        label="Country code"
        helperText="2-letter uppercase ISO country code"
        allowCustomValue
        items={['DE', 'FI', 'US']}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
