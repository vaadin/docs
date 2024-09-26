import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed } from '@vaadin/hilla-react-signals';
import { CustomField } from '@vaadin/react-components/CustomField.js';
import { FormItem } from '@vaadin/react-components/FormItem.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Select } from '@vaadin/react-components/Select.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const monthItems = useComputed(() =>
    Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0')).map((month) => ({
      label: month,
      value: month,
    }))
  );
  const yearItems = useComputed(() =>
    Array.from({ length: 11 }, (_, i) => `${i + new Date().getFullYear()}`).map((year) => ({
      label: year,
      value: year,
    }))
  );

  return (
    <FormLayout>
      <FormItem>
        <label slot="label">Expiration</label>
        <CustomField
          parseValue={(value: string) => (value ? value.split('/') : ['', ''])}
          formatValue={(values: unknown[]) => (values[0] && values[1] ? values.join('/') : '')}
        >
          <HorizontalLayout theme="spacing-xs">
            <Select accessibleName="Month" placeholder="Month" items={monthItems.value} />
            <Select accessibleName="Year" placeholder="Year" items={yearItems.value} />
          </HorizontalLayout>
        </CustomField>
      </FormItem>
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
