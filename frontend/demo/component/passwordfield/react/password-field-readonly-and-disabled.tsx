import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { PasswordField } from '@vaadin/react-components/PasswordField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <PasswordField readonly label="Read-only" value="Ex@mplePassw0rd" />

      <PasswordField disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
