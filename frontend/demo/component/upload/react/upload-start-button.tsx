import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed } from '@vaadin/hilla-react-signals'; // hidden-source-line
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadStartButton } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const files = useComputed(createFakeFilesUploadStartButton); // hidden-source-line
  return (
    // tag::snippet[]
    <Upload
      files={files.value} // hidden-source-line-trim
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
