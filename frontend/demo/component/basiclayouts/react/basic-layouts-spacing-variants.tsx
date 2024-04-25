import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import type { RadioGroupValueChangedEvent } from '@vaadin/react-components/RadioGroup';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';

function Example() {
  useSignals(); // hidden-source-line
  const themeVariant = useSignal('spacing-xl');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${themeVariant.value} padding`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

      <RadioGroup
        label="Spacing variant"
        value={themeVariant.value}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          themeVariant.value = event.detail.value;
        }}
      >
        <RadioButton value="spacing-xs" label="spacing-xs" />
        <RadioButton value="spacing-s" label="spacing-s" />
        <RadioButton value="spacing" label="spacing" />
        <RadioButton value="spacing-l" label="spacing-l" />
        <RadioButton value="spacing-xl" label="spacing-xl" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
