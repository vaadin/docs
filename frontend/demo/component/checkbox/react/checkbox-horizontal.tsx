import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <CheckboxGroup label="Permissions">
      <Checkbox value="read" label="Read" />
      <Checkbox value="edit" label="Edit" />
      <Checkbox value="delete" label="Delete" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
