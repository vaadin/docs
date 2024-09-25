import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { createFakeUploadFiles } from './upload-demo-helpers';

function createFakeFiles() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: 'Something went wrong, please try again' },
  ]);
}

function Example() {
  const files = createFakeFiles();

  return (
    // tag::snippet[]
    <Upload files={files} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
