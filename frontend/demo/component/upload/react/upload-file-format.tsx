import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  useSignals(); // hidden-source-line

  const uploadI18n = useSignal({
    addFiles: { one: 'Upload Report...' },
    dropFiles: { one: 'Drop report here' },
    error: {
      incorrectFileType: 'The provided file does not have the correct format (PDF document).',
    },
  });

  return (
    <>
      {/* tag::snippet[] */}
      <h4>Upload report</h4>
      <p style={{ color: 'var(--vaadin-text-color-secondary)' }}>
        Accepted file formats: PDF (.pdf)
      </p>
      <Upload
        accept="application/pdf,.pdf"
        maxFiles={1}
        i18n={uploadI18n.value}
        onFileReject={(event) => {
          Notification.show(event.detail.error, { position: 'middle', theme: 'error' });
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
