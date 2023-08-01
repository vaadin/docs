import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [user, setUser] = useState<Person>();

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
        footerRenderer={() => (
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
      >
        {() => <>Are you sure you want to delete this user permanently?</>}
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
