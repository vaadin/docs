import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadRetryButton } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  const files = createFakeFilesUploadRetryButton(); // hidden-source-line
  return (
    // tag::snippet[]
    <Upload
      files={files} // hidden-source-line-trim
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
