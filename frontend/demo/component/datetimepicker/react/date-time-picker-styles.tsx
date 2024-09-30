import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <DateTimePicker
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="2020-06-12T12:30"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
