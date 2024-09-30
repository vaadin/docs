import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed } from '@vaadin/hilla-react-signals';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeUploadFiles } from './upload-demo-helpers';

function createFakeFiles() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
  ]);
}

function Example() {
  useSignals(); // hidden-source-line
  const files = useComputed(createFakeFiles);

  return (
    // tag::snippet[]
    <Upload files={files.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
