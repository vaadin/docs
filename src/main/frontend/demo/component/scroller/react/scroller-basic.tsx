import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import exampleStyles from './scroller-basic-styles'; // hidden-source-line

function Example() {
  return (
    <VerticalLayout className="border border-contrast-20 items-stretch max-w-full" id="container">
      <header className="flex gap-m items-center border-b p-m">
        <a href="#" aria-label="Go back">
          <Icon className="box-border icon-m p-xs" icon="vaadin:arrow-left" aria-hidden="true" />
        </a>
        <h2 className="text-xl">Edit employee</h2>
      </header>

      {/* tag::snippet[] */}
      <Scroller className="border-b p-m" scrollDirection="vertical">
        <section aria-labelledby="personal-title">
          <h3 className="text-l" id="personal-title">Personal information</h3>
          <TextField className="w-full" label="First name" />
          <TextField className="w-full" label="Last name" />
          <DatePicker initialPosition="1990-01-01" label="Birthdate" className="w-full" />
        </section>
        <section aria-labelledby="employment-title">
          <h3 className="mt-l text-l" id="employment-title">Employment information</h3>
          <TextField className="w-full" label="Position" />
          <TextArea className="w-full" label="Additional information" />
        </section>
      </Scroller>
      {/* end::snippet[] */}

      <footer className="flex gap-s px-m py-s">
        <Button theme="primary">Save</Button>
        <Button theme="tertiary">Reset</Button>
      </footer>
    </VerticalLayout>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
