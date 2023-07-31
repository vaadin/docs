import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);

  const open = () => {
    setDialogOpened(true);
  };

  const close = () => {
    setDialogOpened(false);
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        aria-label="Add note"
        draggable
        modeless
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
        }}
        headerRenderer={() => (
          <h2
            className="draggable"
            style={{
              flex: 1,
              cursor: 'move',
              margin: 0,
              fontSize: '1.5em',
              fontWeight: 'bold',
              padding: 'var(--lumo-space-m) 0',
            }}
          >
            Add note
          </h2>
        )}
        contentRenderer={() => (
          <VerticalLayout
            theme="spacing"
            style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
          >
            <VerticalLayout style={{ alignItems: 'stretch' }}>
              <TextField label="Title" />
              <TextArea label="Description" />
            </VerticalLayout>
          </VerticalLayout>
        )}
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancel</Button>
            <Button theme="primary" onClick={close}>
              Add note
            </Button>
          </>
        )}
      />
      {/* end::snippet[] */}
      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example);
