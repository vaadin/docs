import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <CheckboxGroup label="Working days" theme="vertical">
      <Checkbox value="mon" label="Monday" />
      <Checkbox value="tue" label="Tuesday" />
      <Checkbox value="wed" label="Wednesday" />
      <Checkbox value="thu" label="Thursday" />
      <Checkbox value="fri" label="Friday" />
      <Checkbox value="sat" label="Saturday" />
      <Checkbox value="sun" label="Sunday" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
