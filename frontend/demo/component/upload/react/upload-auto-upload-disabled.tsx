import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { Upload, type UploadElement } from '@hilla/react-components/Upload.js';
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  const uploadRef = useRef<UploadElement>(null);

  useEffect(() => {
    if (!uploadRef.current) {
      return;
    }
    uploadRef.current.i18n.addFiles.many = 'Select Files...';
    uploadRef.current.i18n = { ...uploadRef.current.i18n };
  }, []);

  return (
    // tag::snippet[]
    <Upload noAuto ref={uploadRef} files={createFakeFilesUploadAutoUploadDisabled()} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
