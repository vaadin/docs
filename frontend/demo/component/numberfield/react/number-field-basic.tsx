import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { NumberField } from '@vaadin/react-components/NumberField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <NumberField label="Balance" value="200">
        <div slot="prefix">$</div>
      </NumberField>

      <NumberField label="Balance" value="200">
        <div slot="suffix">€</div>
      </NumberField>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
