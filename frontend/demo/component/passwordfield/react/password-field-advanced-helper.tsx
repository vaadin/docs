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

const pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*';

function Example() {
  useSignals(); // hidden-source-line
  const password = useSignal<string>('');

  function onPasswordChanged(event: PasswordFieldValueChangedEvent) {
    password.value = event.detail.value;
  }

  let strength: PasswordStrength;
  if (password.value.length > 9) {
    strength = 'strong';
  } else if (password.value.length > 5) {
    strength = 'moderate';
  } else {
    strength = 'weak';
  }

  return (
    // tag::snippet[]
    <PasswordField
      label="Password"
      pattern={pattern}
      errorMessage="Not a valid password"
      value={password.value}
      onValueChanged={onPasswordChanged}
      style={{ width: '14em' }}
    >
      <Icon icon="vaadin:check" slot="suffix" className={strength} hidden={strength !== 'strong'} />

      <div slot="helper">
        Password strength: <span className={strength}>{strength}</span>
      </div>
    </PasswordField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
