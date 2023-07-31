import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  return (
    <>
      <h4>Upload report</h4>
      <p>Accepted file formats: PDF (.pdf)</p>
      <Upload
        accept="application/pdf,.pdf"
        maxFiles={1}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
    </>
  );
}

export default reactExample(Example);
