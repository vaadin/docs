import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { ConfirmDialog } from '@vaadin/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import confirmDialogBasicStyles from './confirm-dialog-basic-styles';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(true);
  const status = useSignal('');

  function open() {
    status.value = '';
    dialogOpened.value = true;
  }

  function onClosed() {
    dialogOpened.value = false;
  }

  return (
    <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
      <Button onClick={open}>Open confirm dialog</Button>

      {/* tag::snippet[] */}
      <ConfirmDialog
        header="Unsaved changes"
        cancelButtonVisible
        rejectButtonVisible
        rejectText="Discard"
        confirmText="Save"
        opened={dialogOpened.value}
        onClosed={onClosed}
        onConfirm={() => {
          status.value = 'Saved';
        }}
        onCancel={() => {
          status.value = 'Canceled';
        }}
        onReject={() => {
          status.value = 'Discarded';
        }}
      >
        There are unsaved changes. Do you want to discard or save them?
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status.value === ''}>Status: {status.value}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example, confirmDialogBasicStyles); // hidden-source-line
