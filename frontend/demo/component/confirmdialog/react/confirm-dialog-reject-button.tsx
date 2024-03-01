import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  Button,
  ConfirmDialog,
  type ConfirmDialogOpenedChangedEvent,
  HorizontalLayout,
} from '@vaadin/react-components';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [status, setStatus] = useState('');

  const openedChanged = (e: ConfirmDialogOpenedChangedEvent) => {
    setDialogOpened(e.detail.value);
    if (e.detail.value) {
      setStatus('');
    }
  };

  const open = () => {
    setDialogOpened(true);
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
        opened={dialogOpened}
        onOpenedChanged={openedChanged}
        onConfirm={() => {
          setStatus('Saved');
        }}
        onCancel={() => {
          setStatus('Canceled');
        }}
        onReject={() => {
          setStatus('Discarded');
        }}
      >
        Do you want to discard or save your changes before navigating away?
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status === ''}>Status: {status}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
