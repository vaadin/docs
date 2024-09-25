import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useComputed } from '@vaadin/hilla-react-signals';
import { Upload, type UploadElement } from '@vaadin/react-components/Upload.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files';

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

  const files = useComputed(createFakeFilesUploadAutoUploadDisabled);

  return (
    // tag::snippet[]
    <Upload noAuto ref={uploadRef} files={files.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
