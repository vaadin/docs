import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { PasswordField } from '@vaadin/react-components/PasswordField.js';

function Example() {
  return (
    // tag::snippet[]
    <PasswordField label="Password" value="Ex@mplePassw0rd" revealButtonHidden />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
