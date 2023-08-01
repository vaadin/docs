import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Notification } from '@hilla/react-components/Notification.js';
import React, { useEffect, useRef } from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import type { UploadFileRejectEvent } from '@hilla/react-components/Upload.js';

function Example() {
  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (uploadRef.current) {
      uploadRef.current.i18n.addFiles.one = 'Upload PDF...';
      uploadRef.current.i18n.dropFiles.one = 'Drop PDF here';
      uploadRef.current.i18n.error.incorrectFileType =
        'The provided file does not have the correct format (PDF document).';
      uploadRef.current.i18n = { ...uploadRef.current.i18n };
    }
  }, []);

  const fileRejectHandler = (event: UploadFileRejectEvent) => {
    Notification.show(event.detail.error);
  };

  return (
    <Upload
      maxFiles={1}
      accept="application/pdf,.pdf"
      ref={uploadRef}
      onFileReject={fileRejectHandler}
    />
  );
}

export default reactExample(Example); // hidden-source-line
