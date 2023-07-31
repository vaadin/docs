import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        theme="align-right small helper-above-field"
        label="Label"
        helperText="Helper text"
        items={['Value']}
        value="Value"
        style={{ '--vaadin-input-field-border-width': '1px' }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
