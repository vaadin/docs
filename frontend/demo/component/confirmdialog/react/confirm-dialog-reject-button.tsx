import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import {
  ConfirmDialog,
  type ConfirmDialogOpenedChangedEvent,
} from '@vaadin/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const status = useSignal('');

  const openedChanged = (e: ConfirmDialogOpenedChangedEvent) => {
    dialogOpened.value = e.detail.value;
    if (e.detail.value) {
      status.value = '';
    }
  };

  const open = () => {
    dialogOpened.value = true;
  };

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
        onOpenedChanged={openedChanged}
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
        Do you want to discard or save your changes before navigating away?
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status.value === ''}>Status: {status.value}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
