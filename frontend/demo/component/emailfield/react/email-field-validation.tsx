import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { EmailField } from '@vaadin/react-components/EmailField.js';

function Example() {
  return (
    // tag::snippet[]
    <EmailField
      pattern="^.+@example\.com$"
      required
      label="Email address"
      errorMessage="Enter a valid example.com email address"
      helperText="Only example.com addresses allowed"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
