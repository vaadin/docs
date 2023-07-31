import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useRef } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Upload } from '@hilla/react-components/Upload.js';

const layoutSteps = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];

const Example = () => {
  const uploadCaution = useRef(null);
  const uploadRecommended = useRef(null);

  useEffect(() => {
    uploadCaution.current.setupMockErrorResponse();
    uploadRecommended.current.setupMockErrorResponse();

    uploadCaution.current.messages.uploader.unexpectedError = 'Unexpected Server Error';
    uploadCaution.current.messages = { ...uploadCaution.current.messages };

    uploadRecommended.current.messages.uploader.unexpectedError =
      "File couldn't be uploaded, try again later";
    uploadRecommended.current.messages = { ...uploadRecommended.current.messages };
  }, []);

  return (
    <>
      <FormLayout responsiveSteps={layoutSteps}>
        <div>
          <strong>Caution</strong>
          <Upload ref={uploadCaution} nodrop files={createFakeFilesUploadErrorMessagesA()} />
        </div>
        <div>
          <strong>Recommended</strong>
          <Upload ref={uploadRecommended} nodrop files={createFakeFilesUploadErrorMessagesB()} />
        </div>
      </FormLayout>
    </>
  );
};

export default reactExample(Example);
