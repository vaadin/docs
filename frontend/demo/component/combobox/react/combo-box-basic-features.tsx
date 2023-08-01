import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        label="Label"
        helperText="Helper text"
        placeholder="Placeholder"
        clearButtonVisible
        items={['Value']}
      >
        <Tooltip slot="tooltip" text="Tooltip text" />
        <Icon slot="prefix" icon="vaadin:search" />
      </ComboBox>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
