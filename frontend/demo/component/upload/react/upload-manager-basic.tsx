import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { UploadButton } from '@vaadin/react-components/UploadButton.js';
import { UploadFileList } from '@vaadin/react-components/UploadFileList.js';
import { UploadManager } from '@vaadin/upload';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  // tag::snippet[]
  // Create the upload manager
  const manager = React.useMemo(
    () =>
      new UploadManager({
        target: '/api/fileupload',
        maxFiles: 5,
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        accept: 'image/*,application/pdf',
      }),
    []
  );

  return (
    <VerticalLayout theme="spacing padding">
      <UploadButton manager={manager}>Select Files</UploadButton>
      <UploadFileList manager={manager} />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
