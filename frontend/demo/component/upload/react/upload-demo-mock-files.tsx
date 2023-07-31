import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

Upload.prototype.createFakeFilesUploadBasic = function createFakeFilesUploadBasic() {
  return createFakeUploadFiles([
    { name: 'Annual Report.docx', complete: true },
    {
      name: 'Workflow.pdf',
      progress: 60,
      status: '19.7 MB: 60% (remaining time: 00:12:34)',
    },
    { name: 'Financials.xlsx', error: 'An error occurred' },
  ]);
};

Upload.prototype.createFakeFilesUploadAutoUploadDisabled =
  function createFakeFilesUploadAutoUploadDisabled() {
    return createFakeUploadFiles([
      {
        name: 'Workflow.pdf',
        status: 'Queued',
        held: true,
      },
    ]);
  };

Upload.prototype.createFakeFilesUploadAllFiles = function createFakeFilesUploadAllFiles() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
    {
      name: 'Financials.xlsx',
      status: 'Queued',
      held: true,
    },
  ]);
};

Upload.prototype.createFakeFilesUploadErrorMessagesA =
  function createFakeFilesUploadErrorMessagesA() {
    return createFakeUploadFiles([{ name: 'Financials.xlsx', error: 'Unexpected Server Error' }]);
  };

Upload.prototype.createFakeFilesUploadErrorMessagesB =
  function createFakeFilesUploadErrorMessagesB() {
    return createFakeUploadFiles([
      { name: 'Financials.xlsx', error: "File couldn't be uploaded, try again later" },
    ]);
  };

Upload.prototype.setupMockErrorResponse = function setupMockErrorResponse() {
  // Monkey-patch vaadin-upload instance to use XHRs that always return a mock error response
  (this as any)._createXhr = mockErrorXhrGenerator;
};

function Example() {
  return <Upload />;
}

export default reactExample(Example);
