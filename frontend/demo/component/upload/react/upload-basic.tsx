import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed } from '@vaadin/hilla-react-signals'; // hidden-source-line
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadBasic } from './upload-demo-mock-files'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const files = useComputed(createFakeFilesUploadBasic); // hidden-source-line
  return (
    <>
      {/* tag::snippet[] */}
      {/* Use the target attribute to specify the URL that handles the file upload */}
      <Upload
        target="/api/fileupload"
        files={files.value} // hidden-source-line
        // ... other properties
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
