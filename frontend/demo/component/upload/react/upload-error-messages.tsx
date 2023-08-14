import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';
import { Upload, type UploadElement } from '@hilla/react-components/Upload.js';
import {
  createFakeFilesUploadErrorMessagesA,
  createFakeFilesUploadErrorMessagesB,
} from './upload-demo-mock-files';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];
const Example = () => {
  const uploadCaution = useRef<UploadElement>(null);
  const uploadRecommended = useRef<UploadElement>(null);

  // tag::snippet[]
  useEffect(() => {
    if (!uploadCaution.current || !uploadRecommended.current) {
      return;
    }

    uploadCaution.current.setupMockErrorResponse();
    uploadRecommended.current.setupMockErrorResponse();

    uploadCaution.current.i18n.uploading.error.unexpectedServerError = 'Unexpected Server Error';
    uploadCaution.current.i18n = { ...uploadCaution.current.i18n };

    uploadRecommended.current.i18n.uploading.error.unexpectedServerError =
      "File couldn't be uploaded, try again later";
    uploadRecommended.current.i18n = { ...uploadRecommended.current.i18n };
  }, []);

  return (
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
  );
  // end::snippet[]
};

export default reactExample(Example); // hidden-source-line
