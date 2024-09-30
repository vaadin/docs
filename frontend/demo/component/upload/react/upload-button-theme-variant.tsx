import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useRef } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  const maxFilesReached = useRef(false);

  const fileRejectHandler = (event: any) => {
    Notification.show(`Error: ${event.detail.error} '${event.detail.file.name}'`);
  };

  const maxFilesReachedChangedHandler = (event: any) => {
    maxFilesReached.current = event.detail.value;
  };

  return (
    // tag::snippet[]
    <Upload
      maxFiles={1}
      accept="application/pdf,.pdf"
      onFileReject={fileRejectHandler}
      onMaxFilesReachedChanged={maxFilesReachedChangedHandler}
    >
      <Button slot="add-button" theme="primary" disabled={maxFilesReached.current}>
        Upload PDF...
      </Button>
    </Upload>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
