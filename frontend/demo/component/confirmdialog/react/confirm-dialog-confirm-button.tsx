import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import {
  ConfirmDialog,
  type ConfirmDialogOpenedChangedEvent,
} from '@vaadin/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const status = useSignal('');

  function openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    dialogOpened.value = e.detail.value;
    if (e.detail.value) {
      status.value = '';
    }
  }

  function open() {
    dialogOpened.value = true;
  }

  return (
    <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
      <Button onClick={open}>Open confirm dialog</Button>

      {/* tag::snippet[] */}
      <ConfirmDialog
        header="Export failed"
        confirmText="OK"
        opened={dialogOpened.value}
        onOpenedChanged={openedChanged}
        onConfirm={() => {
          status.value = 'Acknowledged';
        }}
      >
        An error occurred while exporting <b>Report Q4</b>. Please try again. If the problem
        persists, contact <a href="mailto:support@company.com">support@company.com</a>.
      </ConfirmDialog>
      {/* end::snippet[] */}

      <span hidden={status.value === ''}>Status: {status.value}</span>
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
