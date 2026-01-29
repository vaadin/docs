import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { UploadButton } from '@vaadin/react-components/UploadButton.js';
import { UploadDropZone } from '@vaadin/react-components/UploadDropZone.js';
import { UploadFileList } from '@vaadin/react-components/UploadFileList.js';
import { UploadManager } from '@vaadin/upload';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import '@vaadin/icons';

function Example() {
  // tag::snippet[]
  // Create the upload manager
  const manager = React.useMemo(
    () =>
      new UploadManager({
        target: '/api/fileupload',
        maxFiles: 10,
        accept: 'image/*',
      }),
    []
  );

  return (
    <VerticalLayout theme="spacing">
      <UploadDropZone
        manager={manager}
        style={{
          border: '2px dashed var(--lumo-contrast-30pct)',
          borderRadius: 'var(--lumo-border-radius-l)',
          padding: 'var(--lumo-space-l)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:upload" />
          <span>Drop images here or</span>
          <UploadButton manager={manager}>Browse</UploadButton>
        </HorizontalLayout>
      </UploadDropZone>
      <UploadFileList manager={manager} />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
