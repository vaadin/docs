import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import React from 'react';
import { UploadButton } from '@vaadin/react-components/UploadButton.js';
import { UploadFileList } from '@vaadin/react-components/UploadFileList.js';
import { UploadManager } from '@vaadin/upload/vaadin-upload-manager.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  // tag::snippet[]
  const manager = React.useMemo(
    () =>
      new UploadManager({
        target: '/api/fileupload',
      }),
    []
  );

  return (
    <VerticalLayout theme="spacing">
      <UploadButton manager={manager}>Select Files</UploadButton>
      <UploadFileList manager={manager} theme="thumbnails" style={{ width: '100%' }} />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
