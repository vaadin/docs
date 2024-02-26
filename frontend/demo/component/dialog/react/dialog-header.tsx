import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { Button } from '@vaadin/react-components/Button.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import '@vaadin/icons';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const user = useSignal<Person>();
  const open = () => {
    dialogOpened.value = true;
  };
  const close = () => {
    dialogOpened.value = false;
  };

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      user.value = people[0];
    });
  }, []);

  const addressDescription = () => {
    if (!user.value) {
      return '';
    }
    const { address } = user.value;
    return `${address.street}, ${address.city}, ${address.country}`;
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        header-title="User details"
        opened={dialogOpened.value}
        onOpenedChanged={(event) => {
          dialogOpened.value = event.detail.value;
        }}
        headerRenderer={() => (
          <Button theme="tertiary" onClick={close}>
            <Icon icon="lumo:cross" />
          </Button>
        )}
      >
        <VerticalLayout
          theme="spacing"
          style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
        >
          <VerticalLayout style={{ alignItems: 'stretch' }}>
            <TextField
              label="Name"
              value={`${user.value?.firstName} ${user.value?.lastName}`}
              readonly
              style={{ paddingTop: 0 }}
            />
            <EmailField label="Email" value={user.value?.email} readonly />
            <TextField label="Address" value={addressDescription()} readonly />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Show dialog</Button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
