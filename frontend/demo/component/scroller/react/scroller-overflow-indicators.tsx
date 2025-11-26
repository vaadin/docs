import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import exampleStyles from './scroller-basic-styles'; // hidden-source-line

function Example() {
  return (
    <VerticalLayout id="container">
      <h2 style={{ fontSize: '1.375rem', padding: '1rem' }}>Create your account</h2>

      {/* tag::snippet[] */}
      <Scroller scrollDirection="vertical" theme="overflow-indicators">
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 1rem 1rem' }}>
          <TextField className="w-full" label="First name"></TextField>
          <TextField className="w-full" label="Last name"></TextField>
          <TextField className="w-full" label="Email"></TextField>
          <TextField className="w-full" label="Phone number"></TextField>
          <TextField className="w-full" label="Address"></TextField>
          <TextField className="w-full" label="City"></TextField>
          <TextField className="w-full" label="State"></TextField>
          <TextField className="w-full" label="Zip code"></TextField>
          <TextField className="w-full" label="Country"></TextField>
          <Checkbox label="Agree to terms and conditions" />
        </div>
      </Scroller>
      {/* end::snippet[] */}

      <footer style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
        <Button theme="primary">Next</Button>
        <Button theme="tertiary">Cancel</Button>
      </footer>
    </VerticalLayout>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
