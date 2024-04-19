import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import { createFakeUploadFiles } from './upload-demo-helpers';
import {
  useComputed
} from "@vaadin/hilla-react-signals";

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
  const files = useComputed(createFakeFiles);

  return (
    // tag::snippet[]
    <Upload files={files.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
