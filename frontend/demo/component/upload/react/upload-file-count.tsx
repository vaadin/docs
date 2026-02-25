import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const maxFiles = 3;

  const uploadI18n = useSignal({
    error: {
      tooManyFiles: 'You may only upload a maximum of three files at once.',
    },
  });

  return (
    <>
      <h4>Upload files</h4>
      <p style={{ color: 'var(--vaadin-text-color-secondary)' }}>
        Maximum of {maxFiles} files allowed
      </p>
      <Upload
        maxFiles={maxFiles}
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
