import { Stepper } from '@vaadin/react-components/Stepper.js';
import { Step } from '@vaadin/react-components/Step.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';

export default function Example() {
  return (
    // tag::snippet[]
    <Stepper>
      <Step state="completed">
        <Icon icon="vaadin:user" slot="prefix" />
        <span>Account</span>
      </Step>
      <Step state="active">
        <Icon icon="vaadin:envelope" slot="prefix" />
        <span>Email verification</span>
      </Step>
      <Step>
        <Icon icon="vaadin:lock" slot="prefix" />
        <span>Security</span>
      </Step>
      <Step>
        <Icon icon="vaadin:check" slot="prefix" />
        <span>Complete</span>
      </Step>
    </Stepper>
    // end::snippet[]
  );
}