import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification } from '@hilla/react-components/Notification.js';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  // tag::snippet[]
  const maxFileSizeInMB = 10;
  const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

  return (
    <>
      <h4>Upload file</h4>
      <p>Maximum file size: {maxFileSizeInMB} MB</p>
      <Upload
        maxFiles={1}
        maxFileSize={maxFileSizeInBytes}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
