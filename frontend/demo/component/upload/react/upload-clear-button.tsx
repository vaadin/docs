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
      progress: 60,
      status: '19.7 MB: 60% (remaining time: 00:12:34)',
    },
    { name: 'Financials.xlsx', complete: true },
  ]);
}

function Example() {
  const files = useComputed(createFakeFiles);
  return <Upload files={files.value} />;
}

export default reactExample(Example); // hidden-source-line
