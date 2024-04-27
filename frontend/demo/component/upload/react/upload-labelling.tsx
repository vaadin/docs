import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Notification } from '@vaadin/react-components/Notification.js';
import React, { useEffect, useRef } from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import type { UploadFileRejectEvent } from '@vaadin/react-components/Upload.js';

const fileRejectHandler = (event: UploadFileRejectEvent) => {
  Notification.show(event.detail.error);
};

function Example() {
  // tag::snippet[]
  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (uploadRef.current) {
      uploadRef.current.i18n.addFiles.one = 'Upload PDF...';
      uploadRef.current.i18n.dropFiles.one = 'Drop PDF here';
      uploadRef.current.i18n.error.incorrectFileType =
        'The provided file does not have the correct format (PDF document).';
      uploadRef.current.i18n = { ...uploadRef.current.i18n };
    }
  }, [uploadRef.current]);

  return (
    <Upload
      maxFiles={1}
      accept="application/pdf,.pdf"
      ref={uploadRef}
      onFileReject={fileRejectHandler}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
