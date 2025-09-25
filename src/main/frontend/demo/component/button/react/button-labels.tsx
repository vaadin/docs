import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const primaryEmail = useSignal('foo@example.com');
  const secondaryEmail = useSignal('bar@example.com');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
          <EmailField
            label="Primary email address"
            value={primaryEmail.value}
            onValueChanged={(event) => {
              primaryEmail.value = event.detail.value;
            }}
          />
          <Button
            onClick={() => {
              primaryEmail.value = '';
            }}
          >
            Remove
          </Button>
        </HorizontalLayout>

        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
          <EmailField
            label="Secondary email address"
            value={secondaryEmail.value}
            onValueChanged={(event) => {
              secondaryEmail.value = event.detail.value;
            }}
          />
          <Button
            onClick={() => {
              secondaryEmail.value = '';
            }}
          >
            Remove
          </Button>
        </HorizontalLayout>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
