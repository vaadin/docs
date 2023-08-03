import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import {
  ConfirmDialog,
  type ConfirmDialogOpenedChangedEvent,
} from '@hilla/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [status, setStatus] = useState('');

  function openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    setDialogOpened(e.detail.value);
    if (e.detail.value) {
      setStatus('');
    }
  }

  function open() {
    setDialogOpened(true);
  }

  return (
    <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
      <Button onClick={open}>Open confirm dialog</Button>

      {/* tag::snippet[] */}
      <ConfirmDialog
        header="Export failed"
        confirmText="OK"
        opened={dialogOpened}
        onOpenedChanged={openedChanged}
        onConfirm={() => {
          setStatus('Acknowledged');
        }}
      >
        An error occurred while exporting <b>Report Q4</b>. Please try again. If the problem
        persists, contact <a href="mailto:support@company.com">support@company.com</a>.
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status === ''}>Status: {status}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
