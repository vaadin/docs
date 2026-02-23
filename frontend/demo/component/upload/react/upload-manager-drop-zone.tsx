import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { UploadButton } from '@vaadin/react-components/UploadButton.js';
import { UploadDropZone } from '@vaadin/react-components/UploadDropZone.js';
import { UploadFileList } from '@vaadin/react-components/UploadFileList.js';
import { UploadManager } from '@vaadin/upload/vaadin-upload-manager.js';
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
      }),
    []
  );

  return (
    <VerticalLayout theme="spacing" style={{ width: '100%' }}>
      <UploadDropZone
        manager={manager}
        style={{
          border: '1px dashed var(--lumo-contrast-30pct)',
          borderRadius: 'var(--lumo-border-radius-l)',
          padding: 'var(--lumo-space-l)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon="vaadin:upload" />
          <span>Drop files here or</span>
          <UploadButton manager={manager}>Browse</UploadButton>
        </HorizontalLayout>
      </UploadDropZone>
      <UploadFileList manager={manager} style={{ width: '100%' }} />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
