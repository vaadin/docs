import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Button } from '@hilla/react-components/Button.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [user, setUser] = useState<Person | undefined>();
  const open = () => setDialogOpened(true);
  const close = () => setDialogOpened(false);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => setUser(people[0]));
  }, []);

  const renderDialog = () => (
    <VerticalLayout
      theme="spacing"
      style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
    >
      <VerticalLayout style={{ alignItems: 'stretch' }}>
        <TextField
          label="Name"
          value={`${user?.firstName} ${user?.lastName}`}
          readOnly
          style={{ paddingTop: 0 }}
        />
        <EmailField label="Email" value={user?.email} readOnly />
        <TextField label="Address" value={addressDescription()} readOnly />
      </VerticalLayout>
    </VerticalLayout>
  );

  const addressDescription = () => {
    if (!user) {
      return '';
    }
    const { address } = user;
    return `${address.street}, ${address.city}, ${address.country}`;
  };

  return (
    <>
      <Dialog
        header-title="User details"
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
        }}
        headerRenderer={() => (
          <Button theme="tertiary" onClick={close}>
            <Icon icon="lumo:cross" />
          </Button>
        )}
        bodyRenderer={renderDialog}
      />
      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example);
