import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    <>
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
    </>
  );
}

export default reactExample(Example); // hidden-source-line
