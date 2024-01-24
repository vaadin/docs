import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import exampleStyles from './scroller-basic-styles'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { Button } from '@vaadin/react-components/Button.js';
import '@vaadin/icons';

function Example() {
  return (
    <VerticalLayout id="container">
      <header>
        <a href="#" aria-label="Go back">
          <Icon icon="vaadin:arrow-left" aria-hidden="true" />
        </a>
        <h2>Edit employee</h2>
      </header>

      {/* tag::snippet[] */}
      <Scroller
        scrollDirection="vertical"
        style={{
          borderBottom: '1px solid var(--lumo-contrast-20pct)',
          padding: 'var(--lumo-space-m)',
        }}
      >
        <section aria-labelledby="personal-title">
          <h3 id="personal-title">Personal information</h3>
          <TextField style={{ width: '100%' }} label="First name" />
          <TextField style={{ width: '100%' }} label="Last name" />
          <DatePicker initialPosition="1990-01-01" label="Birthdate" style={{ width: '100%' }} />
        </section>
        <section aria-labelledby="employment-title">
          <h3 id="employment-title">Employment information</h3>
          <TextField style={{ width: '100%' }} label="Position" />
          <TextArea style={{ width: '100%' }} label="Additional information" />
        </section>
      </Scroller>
      {/* end::snippet[] */}

      <footer>
        <Button theme="primary">Save</Button>
        <Button theme="tertiary">Reset</Button>
      </footer>
    </VerticalLayout>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
