import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';

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
        headerTitle="System maintenance"
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
        footer={<Button onClick={close}>Close</Button>}
      >
        <p style={{ maxWidth: '300px' }}>
          System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We apologise for
          any inconvenience.
        </p>
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
