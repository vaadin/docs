import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { PasswordField } from '@vaadin/react-components/PasswordField.js';

function Example() {
  return (
    // tag::snippet[]
    <PasswordField
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="Ex@mplePassw0rd"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
