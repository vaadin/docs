import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { CustomField, HorizontalLayout, Select, TextField } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <CustomField label="Price" theme="small">
      <HorizontalLayout theme="spacing-s">
        <TextField accessibleName="Amount" theme="small" />
        <Select
          accessibleName="Currency"
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
