import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Upload, type UploadElement } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const uploadRef = useRef<UploadElement>(null);
  const uploadI18n = useSignal({
    addFiles: {
      many: 'Select Files...',
    },
  });

  const files = useComputed(createFakeFilesUploadAllFiles);

  return (
    <>
      {/* tag::snippet[] */}
      <Upload noAuto ref={uploadRef} files={files.value} i18n={uploadI18n.value} />

      <Button theme="primary" onClick={() => uploadRef.current?.uploadFiles()}>
        Upload All Files
      </Button>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
