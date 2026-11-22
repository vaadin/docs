import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { PdfViewer } from '@vaadin/react-components-pro/PdfViewer.js';
import pdfUrl from '../../../../../src/main/resources/documents/invoice.pdf?url';

function Example() {
  return (
    <PdfViewer src={pdfUrl} fileName="invoice.pdf" style={{ height: '500px' }}>
      {/* tag::snippet[] */}
      <Button
        slot="toolbar-actions"
        theme="tertiary"
        onClick={() => Notification.show('Invoice approved')}
      >
        Approve
      </Button>
      {/* end::snippet[] */}
    </PdfViewer>
  );
}

export default reactExample(Example); // hidden-source-line
