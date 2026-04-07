import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const maxFileSizeInMB = 10;
  const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

  const uploadI18n = useSignal({
    error: {
      fileIsTooBig: 'The file exceeds the maximum allowed size of 10MB.',
    },
  });

  return (
    <>
      <h4>Upload file</h4>
      <p style={{ color: 'var(--vaadin-text-color-secondary)' }}>
        Maximum file size: {maxFileSizeInMB} MB
      </p>
      <Upload
        maxFiles={1}
        maxFileSize={maxFileSizeInBytes}
        i18n={uploadI18n.value}
        onFileReject={(event) => {
          Notification.show(event.detail.error, { position: 'middle', theme: 'error' });
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
