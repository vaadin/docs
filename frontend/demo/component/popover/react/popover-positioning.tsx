import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  Popover,
  type PopoverPosition,
  Select,
  VerticalLayout,
} from '@vaadin/react-components';

function Example() {
  useSignals(); // hidden-source-line
  const position = useSignal<PopoverPosition>('bottom');
  const items = [
    { label: 'Top Start', value: 'top-start' },
    { label: 'Top', value: 'top' },
    { label: 'Top End', value: 'top-end' },
    { label: 'Bottom Start', value: 'bottom-start' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Bottom End', value: 'bottom-end' },
    { label: 'Start Top', value: 'start-top' },
    { label: 'Start', value: 'start' },
    { label: 'Start Bottom', value: 'start-bottom' },
    { label: 'End Top', value: 'end-top' },
    { label: 'End', value: 'end' },
    { label: 'End Bottom', value: 'end-bottom' },
  ];

  return (
    <>
      <VerticalLayout theme="padding spacing" style={{ alignItems: 'center' }}>
        <Button id="target" style={{ '--vaadin-button-height': '3rem', marginTop: '1rem' }}>
          Open
        </Button>
        <Select
          label="Position"
          items={items}
          value={position.value}
          onChange={(e) => {
            position.value = e.target.value as PopoverPosition;
          }}
        />
      </VerticalLayout>

      {/* tag::snippet[] */}
      <Popover for="target" position={position.value}>
        Popover content
      </Popover>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
