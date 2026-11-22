import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Select } from '@vaadin/react-components/Select.js';
import { PdfViewer, type PdfViewerElement } from '@vaadin/react-components-pro/PdfViewer.js';
import pdfUrl from '../../../../../src/main/resources/documents/user-guide.pdf?url';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const chapters = [
    { label: 'Getting started', value: '2' },
    { label: 'Recording time', value: '4' },
    { label: 'Submitting a timesheet', value: '6' },
    { label: 'Reports', value: '8' },
    { label: 'Troubleshooting', value: '12' },
  ];

  const viewer = useRef<PdfViewerElement>(null);
  const page = useSignal(1);
  const pageCount = useSignal(0);

  return (
    <>
      <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
        <Select
          placeholder="Go to chapter"
          items={chapters}
          onValueChanged={(event) => {
            if (event.detail.value) {
              viewer.current?.scrollToPage(Number(event.detail.value));
            }
          }}
        />
        <span>{pageCount.value ? `Page ${page.value} of ${pageCount.value}` : ''}</span>
      </HorizontalLayout>

      <PdfViewer
        ref={viewer}
        src={pdfUrl}
        fileName="user-guide.pdf"
        style={{ height: '500px' }}
        onPageChanged={(event) => {
          page.value = event.detail.value;
        }}
        onPageCountChanged={(event) => {
          pageCount.value = event.detail.value;
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
