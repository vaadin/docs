import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step 
        label="Account setup" 
        href="#/account"
        state="completed"
      />
      <Step 
        label="Profile information" 
        href="#/profile"
        state="active"
      />
      <Step 
        label="Preferences" 
        href="#/preferences"
      />
      <Step 
        label="Review" 
        href="#/review"
      />
    </Stepper>
    // end::snippet[]
  );
}