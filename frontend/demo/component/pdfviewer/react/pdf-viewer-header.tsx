import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { PdfViewer } from '@vaadin/react-components-pro/PdfViewer.js';
import pdfUrl from '../../../../../src/main/resources/documents/user-guide.pdf?url';

function Example() {
  return (
    // tag::snippet[]
    <PdfViewer
      src={pdfUrl}
      fileName="user-guide.pdf"
      headerTitle="Time Tracker User Guide"
      toolbarCollapsed
      style={{ height: '500px' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
