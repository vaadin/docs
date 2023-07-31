import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* Use the action property to specify the URL that handles the file upload */}
      {/* Pass an array of File objects to the files property */}
      <Upload
        action="/api/fileupload"
        files={createFakeFilesUploadBasic()}
        // ... other properties
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
