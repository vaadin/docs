import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step label="Shipping address" description="Enter your shipping details" />
      <Step label="Billing address" description="Enter your billing details" />
      <Step label="Payment method" description="Select payment option" />
      <Step label="Review order" description="Review and confirm your order" />
    </Stepper>
    // end::snippet[]
  );
}