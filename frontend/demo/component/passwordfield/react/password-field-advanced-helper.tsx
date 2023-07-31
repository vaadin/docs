import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { Icon } from '@hilla/react-components/Icon.js';

type PasswordStrength = 'moderate' | 'strong' | 'weak';

const StrengthColor: Record<PasswordStrength, string> = {
  weak: 'var(--lumo-error-color)',
  moderate: '#e7c200',
  strong: 'var(--lumo-success-color)',
};

function Example() {
  const [strengthText, setStrengthText] = useState<PasswordStrength>('weak');
  const [strengthColor, setStrengthColor] = useState<string>(StrengthColor.weak);

  const pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*';

  function onPasswordChanged(event: React.ChangeEvent<HTMLInputElement>) {
    let strength: PasswordStrength = 'weak';
    const { value } = event.target;
    if (value) {
      if (value.length > 9) {
        strength = 'strong';
      } else if (value.length > 5) {
        strength = 'moderate';
      }
    }
    setStrengthText(strength);
    setStrengthColor(StrengthColor[strength]);
  }

  return (
    <>
      <PasswordField
        label="Password"
        pattern={pattern}
        errorMessage="Not a valid password"
        onChange={onPasswordChanged}
      >
        <Icon
          icon="vaadin:check"
          slot="suffix"
          style={{ color: StrengthColor.strong }}
          hidden={strengthText !== 'strong'}
        />

        <div slot="helper">
          Password strength: <span style={{ color: strengthColor }}>{strengthText}</span>
        </div>
      </PasswordField>
    </>
  );
}

export default reactExample(Example);
