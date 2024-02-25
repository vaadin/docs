import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import {
  ConfirmDialog,
  type ConfirmDialogOpenedChangedEvent,
} from '@vaadin/react-components/ConfirmDialog.js';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const status = useSignal('');

  const openedChanged = (event: ConfirmDialogOpenedChangedEvent) => {
    dialogOpened.value = event.detail.value;
    if (event.detail.value) {
      status.value = '';
    }
  };

  return (
    <>
      <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
        <Button onClick={() => {
          dialogOpened.value = true;
        }}>Open confirm dialog</Button>

        {/* tag::snippet[] */}
        <ConfirmDialog
          header='Delete "Report Q4"?'
          cancelButtonVisible
          confirmText="Delete"
          confirmTheme="error primary"
          opened={dialogOpened.value}
          onOpenedChanged={openedChanged}
          onCancel={() => {
            status.value = 'Canceled';
          }}
          onConfirm={() => {
            status.value = 'Deleted';
          }}
        >
          Are you sure you want to permanently delete this item?
        </ConfirmDialog>
        {/* end::snippet[] */}

        <span hidden={status.value === ''}>Status: {status.value}</span>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
