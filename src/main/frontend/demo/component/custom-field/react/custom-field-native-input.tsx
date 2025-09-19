import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { CustomField } from '@vaadin/react-components/CustomField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const customFieldValue = useSignal('');

  return (
    <>
      {/* tag::snippet[] */}
      <CustomField
        label="Payment information"
        theme="whitespace"
        onValueChanged={(event) => {
          customFieldValue.value = event.detail.value ?? '';
        }}
      >
        <HorizontalLayout theme="spacing-s">
          <input
            aria-label="Cardholder name"
            pattern="[\p{L} \-]+"
            placeholder="Cardholder name"
            required
            type="text"
          />
          <input
            aria-label="Card number"
            pattern="[\d ]{12,23}"
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
