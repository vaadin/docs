import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <EmailField
        label="Label"
        helperText="Helper text"
        placeholder="Placeholder"
        clearButtonVisible
      >
        <Tooltip slot="tooltip" text="Tooltip text" />
        <Icon slot="prefix" icon="vaadin:envelope" />
      </EmailField>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
