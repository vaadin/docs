import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <h4>Upload report</h4>
      <p>Accepted file formats: PDF (.pdf)</p>
      <Upload
        accept="application/pdf,.pdf"
        maxFiles={1}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
