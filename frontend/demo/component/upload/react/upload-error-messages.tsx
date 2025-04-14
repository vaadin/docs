import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { Upload, type UploadElement } from '@vaadin/react-components/Upload.js';
import {
  createFakeFilesUploadErrorMessagesA,
  createFakeFilesUploadErrorMessagesB,
} from './upload-demo-mock-files';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];
const Example = () => {
  useSignals(); // hidden-source-line
  const uploadCaution = useRef<UploadElement>(null);
  const uploadRecommended = useRef<UploadElement>(null);

  useEffect(() => {
    if (!uploadCaution.current) {
      return;
    }

    uploadCaution.current.setupMockErrorResponse();
  }, [uploadCaution.current]);

  useEffect(() => {
    if (!uploadRecommended.current) {
      return;
    }

    uploadRecommended.current.setupMockErrorResponse();
  }, [uploadRecommended.current]);

  const filesA = useComputed(createFakeFilesUploadErrorMessagesA);
  const filesB = useComputed(createFakeFilesUploadErrorMessagesB);

  const cautionI18n = useSignal({
    uploading: {
      error: {
        unexpectedServerError: 'Unexpected Server Error',
      },
    },
  });
  // tag::snippet[]
  const recommendedI18n = useSignal({
    uploading: {
      error: {
        unexpectedServerError: "File couldn't be uploaded, try again later",
      },
    },
  });

  return (
    <FormLayout responsiveSteps={layoutSteps}>
      <div>
        <strong>Caution</strong>
        <Upload ref={uploadCaution} nodrop files={filesA.value} i18n={cautionI18n.value} />
      </div>

      <div>
        <strong>Recommended</strong>
        <Upload ref={uploadRecommended} nodrop files={filesB.value} i18n={recommendedI18n.value} />
      </div>
    </FormLayout>
  );
  // end::snippet[]
};

export default reactExample(Example); // hidden-source-line
