import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout>
      <CheckboxGroup label="Manufacturer" theme="vertical">
        <Checkbox value="0" label="Akuchi" />
        <Checkbox value="1" label="Broek" />
        <Checkbox value="2" label="Wulf" />
      </CheckboxGroup>

      <CheckboxGroup label="Status" theme="vertical">
        <Checkbox value="0" label="In progress" />
        <Checkbox value="1" label="Done" />
        <Checkbox value="2" label="Cancelled" />
      </CheckboxGroup>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
