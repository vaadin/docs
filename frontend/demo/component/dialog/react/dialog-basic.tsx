import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(true);

  const close = () => {
    setDialogOpened(false);
  };

  return (
    <>
      <Dialog
        headerTitle="New employee"
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => {
          setDialogOpened(detail.value);
        }}
      >
        {() => (
          <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
            <TextField label="First name" />
            <TextField label="Last name" />
          </VerticalLayout>
        )}
      </Dialog>

      <Button onClick={() => setDialogOpened(true)}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
