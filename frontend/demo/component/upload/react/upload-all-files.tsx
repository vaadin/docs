import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { Upload, type UploadElement } from '@hilla/react-components/Upload.js';
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-source-line
import { Button } from '@hilla/react-components/Button.js';

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
    <>
      {/* tag::snippet[] */}
      <Upload noAuto ref={uploadRef} files={createFakeFilesUploadAllFiles()} />

      <Button theme="primary" onClick={() => uploadRef?.current?.uploadFiles()}>
        Upload All Files
      </Button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
