import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NumberField } from '@hilla/react-components/NumberField.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NumberField
        label="Label"
        helperText="Helper text"
        placeholder="Placeholder"
        clearButtonVisible
      >
        <Tooltip slot="tooltip" text="Tooltip text" />

        {/* For prefix/suffix, wrap them in a separate element */}
        <div slot="prefix">$</div>

        {/* Use the <Icon> component instead */}
        <Icon slot="suffix" icon="vaadin:dollar" />
      </NumberField>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
