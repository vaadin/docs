import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed } from '@vaadin/hilla-react-signals'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeFilesUploadErrorMessagesA } from './upload-demo-mock-files'; // hidden-source-line
import { createFakeFilesUploadErrorMessagesB } from './upload-demo-mock-files'; // hidden-source-line
import { mockErrorResponse } from './upload-demo-mock-files'; // hidden-source-line

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];
const Example = () => {
  useSignals(); // hidden-source-line
  const filesA = useComputed(createFakeFilesUploadErrorMessagesA); // hidden-source-line
  const filesB = useComputed(createFakeFilesUploadErrorMessagesB); // hidden-source-line
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
        <Upload
          ref={mockErrorResponse} // hidden-source-line
          nodrop
          files={filesA.value} // hidden-source-line
          i18n={cautionI18n.value}
        />
      </div>

      <div>
        <strong>Recommended</strong>
        <Upload
          ref={mockErrorResponse} // hidden-source-line
          nodrop
          files={filesB.value} // hidden-source-line
          i18n={recommendedI18n.value}
        />
      </div>
    </FormLayout>
  );
  // end::snippet[]
};

export default reactExample(Example); // hidden-source-line
