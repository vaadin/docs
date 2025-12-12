import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step 
        label="Personal details" 
        description="Name, email and phone"
        state="completed"
      />
      <Step 
        label="Address" 
        description="Street, city and postal code"
        state="active"
      />
      <Step 
        label="Payment" 
        description="Credit card or PayPal"
      />
      <Step 
        label="Confirmation" 
        description="Review and submit"
      />
    </Stepper>
    // end::snippet[]
  );
}