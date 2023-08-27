import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [primaryEmail, setPrimaryEmail] = useState('foo@example.com');
  const [secondaryEmail, setSecondaryEmail] = useState('bar@example.com');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
          <EmailField
            label="Primary email address"
            value={primaryEmail}
            onValueChanged={(event) => setPrimaryEmail(event.detail.value)}
          />
          <Button onClick={() => setPrimaryEmail('')}>Remove</Button>
        </HorizontalLayout>

        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
          <EmailField
            label="Secondary email address"
            value={secondaryEmail}
            onValueChanged={(event) => setSecondaryEmail(event.detail.value)}
          />
          <Button onClick={() => setSecondaryEmail('')}>Remove</Button>
        </HorizontalLayout>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
