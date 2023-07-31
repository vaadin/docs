import { reactExample } from 'Frontend/demo/react-example';
import React, { useRef, useEffect } from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  const uploadRef = useRef();

  useEffect(() => {
    uploadRef.current.i18n.addFiles.many = 'Select Files...';
    uploadRef.current.i18n = { ...uploadRef.current.i18n };
  }, []);

  return <Upload noAuto ref={uploadRef} files={createFakeFilesUploadAutoUploadDisabled()}></Upload>;
}

export default reactExample(Example);
