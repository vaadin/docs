import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { ConfirmDialog } from '@hilla/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(true);
  const [status, setStatus] = useState('');

  function openedChanged(event) {
    setDialogOpened(event.detail.value);
    if (event.detail.value) {
      setStatus('');
    }
  }

  return (
    <>
      <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
        <Button onClick={() => setDialogOpened(true)}>Open confirm dialog</Button>

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
          There are unsaved changes. Do you want to discard or save them?
        </ConfirmDialog>
        {/* end::snippet[] */}

        <span hidden={status === ''}>Status: {status}</span>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example);
