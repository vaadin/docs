import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  RadioButton,
  RadioGroup,
  type RadioGroupValueChangedEvent,
  VerticalLayout,
} from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const theme = useSignal('spacing');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout
        theme={`${theme.value} padding`}
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </VerticalLayout>

      <RadioGroup
        label="Spacing"
        value={theme.value}
        onValueChanged={(event: RadioGroupValueChangedEvent) => {
          theme.value = event.detail.value;
        }}
      >
        <RadioButton value="spacing" label="Enabled" />
        <RadioButton value="" label="Disabled" />
      </RadioGroup>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
