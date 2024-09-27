import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { TimePicker } from '@vaadin/react-components/TimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <TimePicker
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="07:00"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
