import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { TextField } from '@hilla/react-components/TextField.js';
import '@vaadin/icons';

function Example() {
  const [tooltipOpened, setTooltipOpened] = useState(false);

  return (
    // tag::snippet[]
    <TextField placeholder="Search">
      <Icon slot="prefix" icon="lumo:search" />
      <Tooltip
        slot="tooltip"
        text="Wrap in “quotes” for exact phrase"
        manual
        opened={tooltipOpened}
      />
      <Button
        slot="suffix"
        theme="tertiary-inline icon"
        onClick={() => setTooltipOpened(!tooltipOpened)}
      >
        <Icon icon="vaadin:info-circle" />
      </Button>
    </TextField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
