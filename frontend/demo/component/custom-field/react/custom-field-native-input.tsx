import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { CustomField, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  const [customFieldValue, setCustomFieldValue] = useState('');

  return (
    <>
      {/* tag::snippet[] */}
      <CustomField
        label="Payment information"
        theme="whitespace"
        onValueChanged={(event) => {
          setCustomFieldValue(event.detail.value ?? '');
        }}
      >
        <HorizontalLayout theme="spacing-s">
          <input
            aria-label="Cardholder name"
            pattern="[\\p{L} \\-]+"
            placeholder="Cardholder name"
            required
            type="text"
          />
          <input
            aria-label="Card number"
            pattern="[\\d ]{12,23}"
            placeholder="Card number"
            required
            type="text"
          />
          <input
            aria-label="Security code"
            pattern="[0-9]{3,4}"
            placeholder="Security code"
            required
            type="text"
          />
        </HorizontalLayout>
      </CustomField>
      <p>
        <b>Payment information:</b> {customFieldValue}
      </p>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
