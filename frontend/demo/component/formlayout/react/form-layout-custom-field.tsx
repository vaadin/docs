import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { FormItem } from '@vaadin/react-components/FormItem.js';
import { Select, type SelectElement } from '@vaadin/react-components/Select.js';
import { CustomField } from '@vaadin/react-components/CustomField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  // tag::snippet[]
  const monthFieldRef = useRef<SelectElement>(null);
  const yearFieldRef = useRef<SelectElement>(null);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  const years = Array.from({ length: 11 }, (_, i) => `${i + new Date().getFullYear()}`);

  useEffect(() => {
    monthFieldRef.current?.focusElement?.setAttribute('title', 'Month');
    yearFieldRef.current?.focusElement?.setAttribute('title', 'Year');
  }, []);

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
              ref={monthFieldRef}
              placeholder="Month"
              items={months.map((month) => ({ label: month, value: month }))}
            />
            <Select
              ref={yearFieldRef}
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
