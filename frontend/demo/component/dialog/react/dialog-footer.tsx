import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const user = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      user.value = people[0];
    });
  }, []);

  function open() {
    dialogOpened.value = true;
  }

  function close() {
    dialogOpened.value = false;
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        headerTitle={`Delete user "${user.value?.firstName} ${user.value?.lastName}"?`}
        opened={dialogOpened.value}
        onOpenedChanged={(event) => {
          dialogOpened.value = event.detail.value;
        }}
        footerRenderer={() => (
          <>
            <Button theme="primary error" onClick={close} style={{ marginRight: 'auto' }}>
              Delete
            </Button>
            <Button theme="tertiary" onClick={close}>
              Cancel
            </Button>
          </>
        )}
      >
        Are you sure you want to delete this user permanently?
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
