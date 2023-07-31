import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextArea
        label="Label"
        helperText="Helper text"
        placeholder="Placeholder"
        clearButtonVisible
        style={{ width: '100%' }}
      >
        <Tooltip slot="tooltip" text="Tooltip text" />
        <Icon slot="prefix" icon="vaadin:vaadin-h" />
        <span slot="suffix">:)</span>
      </TextArea>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
