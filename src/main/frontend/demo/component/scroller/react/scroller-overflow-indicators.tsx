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
    <VerticalLayout className="border border-contrast-20 items-stretch max-w-full" id="container">
      <h2 className="text-xl px-m py-m">Create your account</h2>

      {/* tag::snippet[] */}
      <Scroller scrollDirection="vertical" theme="overflow-indicators">
        <div className="flex flex-col pb-m px-m">
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

      <footer className="flex gap-s px-m py-s">
        <Button theme="primary">Next</Button>
        <Button theme="tertiary">Cancel</Button>
      </footer>
    </VerticalLayout>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
