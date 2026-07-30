import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Required } from '@vaadin/hilla-lit-form';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Switch } from '@vaadin/react-components/Switch.js';
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
      <Switch
        label="I confirm the details are correct"
        required
        errorMessage="You must confirm to continue"
        {...field(model.view)}
      />
      <Button onClick={validate}>Submit</Button>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
