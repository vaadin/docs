import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step 
        label="Step 1" 
        href="#/step1"
        state="completed"
      />
      <Step 
        label="Step 2 (Unavailable)" 
        href="#/step2"
        disabled
        state="active"
      />
      <Step 
        label="Step 3" 
        href="#/step3"
      />
    </Stepper>
    // end::snippet[]
  );
}