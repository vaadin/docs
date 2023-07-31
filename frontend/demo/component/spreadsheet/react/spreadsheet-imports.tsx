import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <vaadin-text-field
        label="Name"
        .helperText=${'Last, First'}
        value="Smith, John"
        theme="spacing"
      ></vaadin-text-field>
      <vaadin-checkbox-group
        label="Report type"
        theme="vertical"
        value={['Charts', 'Grid', 'Spreadsheet']}
      >
        <vaadin-checkbox value="Charts" label="Charts"></vaadin-checkbox>
        <vaadin-checkbox value="Grid" label="Grid"></vaadin-checkbox>
        <vaadin-checkbox value="Spreadsheet" label="Spreadsheet"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <vaadin-button
        style={{
          '--lumo-primary-text-color': 'white',
          '--lumo-primary-color': 'var(--lumo-success-color)',
        }}
      >
        <vaadin-icon slot="prefix" icon="vaadin:check"></vaadin-icon>
        Generate
      </vaadin-button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);