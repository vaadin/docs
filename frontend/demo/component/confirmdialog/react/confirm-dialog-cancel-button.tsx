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

  const openedChanged = (event: ConfirmDialogOpenedChangedEvent) => {
    setDialogOpened(event.detail.value);
    if (event.detail.value) {
      setStatus('');
    }
  };

  return (
    <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
      <Button onClick={() => setDialogOpened(true)}>Open confirm dialog</Button>

      {/* tag::snippet[] */}
      <ConfirmDialog
        header='Delete "Report Q4"?'
        cancelButtonVisible
        confirmText="Delete"
        confirmTheme="error primary"
        opened={dialogOpened}
        onOpenedChanged={openedChanged}
        onCancel={() => {
          setStatus('Canceled');
        }}
        onConfirm={() => {
          setStatus('Deleted');
        }}
      >
        Are you sure you want to permanently delete this item?
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status === ''}>Status: {status}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
