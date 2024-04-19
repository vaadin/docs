import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { useComputed } from "@vaadin/hilla-react-signals";
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Upload, type UploadElement } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';

function Example() {
  useSignals(); // hidden-source-line
  const uploadRef = useRef<UploadElement>(null);

  useEffect(() => {
    if (!uploadRef.current) {
      return;
    }
    uploadRef.current.i18n.addFiles.many = 'Select Files...';
    uploadRef.current.i18n = { ...uploadRef.current.i18n };
  }, [uploadRef.current]);

  const files = useComputed(createFakeFilesUploadAllFiles);

  return (
    <>
      {/* tag::snippet[] */}
      <Upload noAuto ref={uploadRef} files={files.value} />

      <Button theme="primary" onClick={() => uploadRef.current?.uploadFiles()}>
        Upload All Files
      </Button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
