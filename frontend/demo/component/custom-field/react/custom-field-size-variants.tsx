import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { CustomField } from '@hilla/react-components/CustomField.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Select, type SelectElement } from '@hilla/react-components/Select.js';
import { TextField, type TextFieldElement } from '@hilla/react-components/TextField.js';

function Example() {
  const amountRef = useRef<TextFieldElement>(null);
  const currencyRef = useRef<SelectElement>(null);

  useEffect(() => {
    amountRef.current?.focusElement?.setAttribute('title', 'Amount');
    currencyRef.current?.focusElement?.setAttribute('title', 'Currency');
  }, []);

  return (
    // tag::snippet[]
    <CustomField label="Price" theme="small">
      <HorizontalLayout theme="spacing-s">
        <TextField ref={amountRef} theme="small" />
        <Select
          ref={currencyRef}
          items={[
            { label: 'AUD', value: 'aud' },
            { label: 'CAD', value: 'cad' },
            { label: 'CHF', value: 'chf' },
            { label: 'EUR', value: 'eur' },
            { label: 'GBP', value: 'gbp' },
            { label: 'JPY', value: 'jpy' },
            { label: 'USD', value: 'usd' },
          ]}
          theme="small"
          style={{ width: '6em' }}
        />
      </HorizontalLayout>
    </CustomField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
