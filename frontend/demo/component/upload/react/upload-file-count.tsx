import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  const maxFiles = 3;

  return (
    <>
      {/* tag::snippet[] */}
      <h4>Upload files</h4>
      <p>Maximum of {maxFiles} files allowed</p>
      <Upload
        maxFiles={maxFiles}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
