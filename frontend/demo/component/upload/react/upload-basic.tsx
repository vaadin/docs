import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadBasic } from './upload-demo-mock-files';
import {
  useComputed
} from "@vaadin/hilla-react-signals";

function Example() {
  const files = useComputed(createFakeFilesUploadBasic);

  return (
    <>
      {/* tag::snippet[] */}
      {/* Use the target attribute to specify the URL that handles the file upload */}
      <Upload
        target="/api/fileupload"
        files={files.value}
        // ... other properties
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
