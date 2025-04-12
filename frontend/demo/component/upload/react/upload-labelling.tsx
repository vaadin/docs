import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/react-components/Notification.js';
import type { UploadFileRejectEvent } from '@vaadin/react-components/Upload.js';
import { Upload } from '@vaadin/react-components/Upload.js';

const fileRejectHandler = (event: UploadFileRejectEvent) => {
  Notification.show(event.detail.error);
};

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const uploadI18n = useSignal({
    addFiles: {
      one: 'Upload PDF...',
    },
    dropFiles: {
      one: 'Drop PDF here',
    },
    error: {
      incorrectFileType: 'The provided file does not have the correct format (PDF document).',
    },
  });

  return (
    <Upload
      maxFiles={1}
      accept="application/pdf,.pdf"
      i18n={uploadI18n.value}
      onFileReject={fileRejectHandler}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
