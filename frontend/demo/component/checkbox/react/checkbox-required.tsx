import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Checkbox, type CheckboxElement } from '@vaadin/react-components/Checkbox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  const checkboxRef = useRef<CheckboxElement>(null);

  const validate = () => {
    checkboxRef.current?.validate();
  };

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
      <Checkbox
        label="I accept the terms and conditions"
        required
        ref={checkboxRef}
        errorMessage="This field is required"
      />
      <Button onClick={validate}>Submit</Button>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
