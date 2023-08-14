import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);

  function open() {
    setDialogOpened(true);
  }

  function close() {
    setDialogOpened(false);
  }
  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        aria-label="System maintenance notice"
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
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
