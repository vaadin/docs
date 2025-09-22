import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Icon } from '@vaadin/react-components/Icon.js';
import {
  PasswordField,
  type PasswordFieldValueChangedEvent,
} from '@vaadin/react-components/PasswordField.js';

type PasswordStrength = 'moderate' | 'strong' | 'weak';

const StrengthColor: Record<PasswordStrength, string> = {
  weak: 'var(--lumo-error-color)',
  moderate: '#e7c200',
  strong: 'var(--lumo-success-color)',
};

function Example() {
  useSignals(); // hidden-source-line
  const strengthText = useSignal<PasswordStrength>('weak');
  const strengthColor = useSignal<string>(StrengthColor.weak);

  const pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*';

  function onPasswordChanged(event: PasswordFieldValueChangedEvent) {
    let strength: PasswordStrength = 'weak';
    const { value } = event.detail;
    if (value) {
      if (value.length > 9) {
        strength = 'strong';
      } else if (value.length > 5) {
        strength = 'moderate';
      }
    }
    strengthText.value = strength;
    strengthColor.value = StrengthColor[strength];
  }

  return (
    // tag::snippet[]
    <PasswordField
      label="Password"
      pattern={pattern}
      errorMessage="Not a valid password"
      onValueChanged={onPasswordChanged}
    >
      <Icon
        icon="vaadin:check"
        slot="suffix"
        style={{ color: StrengthColor.strong }}
        hidden={strengthText.value !== 'strong'}
      />

      <div slot="helper">
        Password strength: <span style={{ color: strengthColor.value }}>{strengthText.value}</span>
      </div>
    </PasswordField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
