import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <PasswordField
        label="Label"
        helperText="Helper text"
        placeholder="Placeholder"
        clearButtonVisible
      >
        <Tooltip slot="tooltip" text="Tooltip text" />
        <Icon slot="prefix" icon="vaadin:lock" />
      </PasswordField>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
