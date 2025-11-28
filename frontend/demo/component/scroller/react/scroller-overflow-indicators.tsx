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
          <TextField style={{ width: '100%' }} label="First name"></TextField>
          <TextField style={{ width: '100%' }} label="Last name"></TextField>
          <TextField style={{ width: '100%' }} label="Email"></TextField>
          <TextField style={{ width: '100%' }} label="Phone number"></TextField>
          <TextField style={{ width: '100%' }} label="Address"></TextField>
          <TextField style={{ width: '100%' }} label="City"></TextField>
          <TextField style={{ width: '100%' }} label="State"></TextField>
          <TextField style={{ width: '100%' }} label="Zip code"></TextField>
          <TextField style={{ width: '100%' }} label="Country"></TextField>
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
