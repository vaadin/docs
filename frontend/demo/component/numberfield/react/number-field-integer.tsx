import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { IntegerField } from '@vaadin/react-components/IntegerField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <IntegerField label="X" value="-1284" />

      <IntegerField label="Y" value="3910" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
