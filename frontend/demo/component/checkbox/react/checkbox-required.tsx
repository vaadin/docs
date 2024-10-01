import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Required } from '@vaadin/hilla-lit-form';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import { Button } from '@vaadin/react-components/Button.js';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import UserPermissionsModel from 'Frontend/generated/com/vaadin/demo/domain/UserPermissionsModel';

function Example() {
  const { model, field, validate } = useForm(UserPermissionsModel);
  const viewField = useFormPart(model.view);

  useEffect(() => {
    viewField.addValidator(new Required());
  }, []);

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
      <Checkbox
        label="Grant view permissions"
        required
        errorMessage="This field is required"
        {...field(model.view)}
      />
      <Button onClick={validate}>Submit</Button>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
