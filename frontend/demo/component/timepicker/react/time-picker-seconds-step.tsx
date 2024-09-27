import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { TimePicker } from '@vaadin/react-components/TimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <TimePicker label="Message received" value="15:45:08" step={1} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
