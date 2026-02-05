import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step label="Completed step" state="completed" />
      <Step label="Active step" state="active" />
      <Step label="Error step" state="error" />
      <Step label="Inactive step" />
    </Stepper>
    // end::snippet[]
  );
}