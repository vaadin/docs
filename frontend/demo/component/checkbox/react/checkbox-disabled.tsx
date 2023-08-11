import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <CheckboxGroup label="Departments" theme="vertical" disabled>
      <Checkbox value="engineering" label="Engineering" />
      <Checkbox value="human-resources" label="Human Resources" />
      <Checkbox value="marketing" label="Marketing" />
      <Checkbox value="operations" label="Operations" />
      <Checkbox value="sales" label="Sales" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
