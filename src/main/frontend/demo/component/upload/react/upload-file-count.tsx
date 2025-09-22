import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  // tag::snippet[]
  const maxFiles = 3;

  return (
    <>
      <h4>Upload files</h4>
      <p>Maximum of {maxFiles} files allowed</p>
      <Upload
        maxFiles={maxFiles}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
