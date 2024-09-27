import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { FormItem } from '@vaadin/react-components/FormItem.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';

function Example() {
  return (
    // tag::snippet[]
    <FormLayout style={{ '--vaadin-form-item-label-width': '60px' }}>
      {/* Wrap fields into form items, which displays labels on the side by default */}
      <FormItem>
        <label slot="label">Revenue</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>

      <FormItem>
        <label slot="label">Expenses</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>

      <FormItem>
        <label slot="label">Invoices</label>
        <TextField>
          <span slot="suffix">EUR</span>
        </TextField>
      </FormItem>
    </FormLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
