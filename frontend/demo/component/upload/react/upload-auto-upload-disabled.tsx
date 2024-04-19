import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import { Upload, type UploadElement } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files';
import {
  useComputed
} from "@vaadin/hilla-react-signals"; // hidden-source-line

function Example() {
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
