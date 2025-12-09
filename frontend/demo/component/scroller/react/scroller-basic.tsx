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

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  borderBottom: 'solid 1px var(--vaadin-border-color)',
};

function Example() {
  return (
    <VerticalLayout id="container">
      <header style={headerStyle}>
        <a href="#" aria-label="Go back">
          <Icon icon="vaadin:arrow-left" style={{ padding: '0.25rem' }} aria-hidden="true" />
        </a>
        <h2 style={{ fontSize: '1.375rem' }}>Edit employee</h2>
      </header>

      {/* tag::snippet[] */}
      <Scroller
        style={{ borderBottom: 'solid 1px var(--vaadin-border-color)', padding: '1rem' }}
        scrollDirection="vertical"
      >
        <section aria-labelledby="personal-title">
          <h3 id="personal-title" style={{ fontSize: '1.125rem' }}>
            Personal information
          </h3>
          <TextField style={{ width: '100%' }} label="First name" />
          <TextField style={{ width: '100%' }} label="Last name" />
          <DatePicker initialPosition="1990-01-01" label="Birthdate" style={{ width: '100%' }} />
        </section>
        <section aria-labelledby="employment-title">
          <h3 id="employment-title" style={{ fontSize: '1.125rem', marginTop: '1.5rem' }}>
            Employment information
          </h3>
          <TextField style={{ width: '100%' }} label="Position" />
          <TextArea style={{ width: '100%' }} label="Additional information" />
        </section>
      </Scroller>
      {/* end::snippet[] */}

      <footer style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
        <Button theme="primary">Save</Button>
        <Button theme="tertiary">Reset</Button>
      </footer>
    </VerticalLayout>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
