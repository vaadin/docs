import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files';

function Example() {
  useSignals(); // hidden-source-line
  const uploadI18n = useSignal({
    addFiles: {
      many: 'Select Files...',
    },
  });

  const files = useComputed(createFakeFilesUploadAutoUploadDisabled);

  return (
    // tag::snippet[]
    <Upload noAuto files={files.value} i18n={uploadI18n.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
