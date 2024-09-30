import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { DatePicker } from '@vaadin/react-components/DatePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <DatePicker label="Start date" autoOpenDisabled />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
