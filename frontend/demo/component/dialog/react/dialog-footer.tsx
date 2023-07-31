import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [user, setUser] = useState<Person | undefined>();

  React.useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      setUser(people[0]);
    });
  }, []);

  function open() {
    setDialogOpened(true);
  }

  function close() {
    setDialogOpened(false);
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        headerTitle={`Delete user "${user?.firstName} ${user?.lastName}"?`}
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
        }}
      >
        {() => <>Are you sure you want to delete this user permanently?</>}

        {() => (
          <>
            {/* The following code is the dialog footer */}
            <Button theme="primary error" onClick={close} style={{ marginRight: 'auto' }}>
              Delete
            </Button>
            <Button theme="tertiary" onClick={close}>
              Cancel
            </Button>
          </>
        )}
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example);
