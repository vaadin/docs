import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper orientation="horizontal">
      <Step label="Step 1" state="completed" />
      <Step label="Step 2" state="completed" />
      <Step label="Step 3" state="active" />
      <Step label="Step 4" />
    </Stepper>
    // end::snippet[]
  );
}