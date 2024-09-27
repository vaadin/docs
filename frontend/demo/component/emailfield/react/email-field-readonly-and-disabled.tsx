import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <EmailField readonly label="Read-only" value="example@example.com" />

      <EmailField disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
