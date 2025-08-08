import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);

  function open() {
    dialogOpened.value = true;
  }

  function close() {
    dialogOpened.value = false;
  }
  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        aria-label="System maintenance notice"
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
      >
        <VerticalLayout
          theme="spacing"
          style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
        >
          <h2 style={{ margin: 'var(--lumo-space-m) 0', fontSize: '1.5em', fontWeight: 'bold' }}>
            System maintenance
          </h2>
          <p>
            System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We apologise
            for any inconvenience.
          </p>
          <Button onClick={close} style={{ alignSelf: 'flex-end' }}>
            Close
          </Button>
        </VerticalLayout>
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
