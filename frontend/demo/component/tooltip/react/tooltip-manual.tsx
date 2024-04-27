import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Icon } from '@vaadin/react-components/Icon.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import '@vaadin/icons';

function Example() {
  useSignals(); // hidden-source-line
  const tooltipOpened = useSignal(false);

  return (
    // tag::snippet[]
    <TextField placeholder="Search">
      <Icon slot="prefix" icon="lumo:search" />
      <Tooltip
        slot="tooltip"
        text="Wrap in “quotes” for exact phrase"
        manual
        opened={tooltipOpened.value}
      />
      <Button
        slot="suffix"
        theme="tertiary-inline icon"
        onClick={() => {
          tooltipOpened.value = !tooltipOpened.value;
        }}
      >
        <Icon icon="vaadin:info-circle" />
      </Button>
    </TextField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
