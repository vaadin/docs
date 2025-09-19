import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import dialogBasicStyles from './dialog-basic-styles';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(true);

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        headerTitle="New employee"
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
        footer={
          <>
            <Button
              onClick={() => {
                dialogOpened.value = false;
              }}
            >
              Cancel
            </Button>
            <Button
              theme="primary"
              onClick={() => {
                dialogOpened.value = false;
              }}
            >
              Add
            </Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField label="First name" />
          <TextField label="Last name" />
        </VerticalLayout>
      </Dialog>

      <Button
        onClick={() => {
          dialogOpened.value = true;
        }}
      >
        Show dialog
      </Button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, dialogBasicStyles); // hidden-source-line
