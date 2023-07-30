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
        <HorizontalLayout theme="spacing">
          <EmailField
            label="Primary email address"
            value={primaryEmail}
            onValueChanged={(event: any) => setPrimaryEmail(event.target.value)}
          />
          <Button className={'mt-xl'} onClick={() => setPrimaryEmail('')}>Remove</Button>
        </HorizontalLayout>

        <HorizontalLayout theme="spacing">
          <EmailField
            label="Secondary email address"
            value={secondaryEmail}
            onValueChanged={(event: any) => setSecondaryEmail(event.target.value)}
          />
          <Button className={'mt-xl'} onClick={() => setSecondaryEmail('')}>Remove</Button>
        </HorizontalLayout>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
