import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);

  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        aria-label="Add note"
        draggable
        modeless
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
        header={
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
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancel</Button>
            <Button theme="primary" onClick={close}>
              Add note
            </Button>
          </>
        )}
      >
        <VerticalLayout
          theme="spacing"
          style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
        >
          <VerticalLayout style={{ alignItems: 'stretch' }}>
            <TextField label="Title" />
            <TextArea label="Description" />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      {/* end::snippet[] */}
      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
