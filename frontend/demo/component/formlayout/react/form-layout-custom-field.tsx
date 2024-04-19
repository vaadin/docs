import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { FormItem } from '@vaadin/react-components/FormItem.js';
import { Select } from '@vaadin/react-components/Select.js';
import { CustomField } from '@vaadin/react-components/CustomField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  // tag::snippet[]
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  const years = Array.from({ length: 11 }, (_, i) => `${i + new Date().getFullYear()}`);

  return (
    <FormLayout>
      <FormItem>
        <label slot="label">Expiration</label>
        <CustomField
          parseValue={(value: string) => (value ? value.split('/') : ['', ''])}
          formatValue={(values: unknown[]) => (values[0] && values[1] ? values.join('/') : '')}
        >
          <HorizontalLayout theme="spacing-xs">
            <Select
              accessibleName="Month"
              placeholder="Month"
              items={months.map((month) => ({ label: month, value: month }))}
            />
            <Select
              accessibleName="Year"
              placeholder="Year"
              items={years.map((year) => ({ label: year, value: year }))}
            />
          </HorizontalLayout>
        </CustomField>
      </FormItem>
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
