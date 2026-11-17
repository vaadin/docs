import { Upload } from '@vaadin/upload';
import { createFakeUploadFiles, mockErrorXhrGenerator } from './upload-demo-helpers';

// Used by `upload-basic.ts`
export function createFakeFilesUploadBasic() {
  return createFakeUploadFiles([
    { name: 'Annual Report.docx', complete: true },
    {
      name: 'Workflow.pdf',
      progress: 60,
      status: '19.7 MB: 60% (remaining time: 00:12:34)',
    },
    { name: 'Financials.xlsx', error: 'An error occurred' },
  ]);
}

// Used by `upload-auto-upload-disabled.ts`
export function createFakeFilesUploadAutoUploadDisabled() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
  ]);
}

// Used by `upload-all-files.ts`
export function createFakeFilesUploadAllFiles() {
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
}

// Used by `upload-error-messages.ts`
export function createFakeFilesUploadErrorMessagesA() {
  return createFakeUploadFiles([{ name: 'Financials.xlsx', error: 'Unexpected Server Error' }]);
}

// Used by `upload-error-messages.ts`
export function createFakeFilesUploadErrorMessagesB() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: "File couldn't be uploaded, try again later" },
  ]);
}

// Used by `upload-clear-button.ts`
export function createFakeFilesUploadClearButton() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      progress: 60,
      status: '19.7 MB: 60% (remaining time: 00:12:34)',
    },
    { name: 'Financials.xlsx', complete: true },
  ]);
}

// Used by `upload-start-button.ts`
export function createFakeFilesUploadStartButton() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
  ]);
}

// Used by `upload-retry-button.ts`
export function createFakeFilesUploadRetryButton() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: 'Something went wrong, please try again' },
  ]);
}

// Expose functions for Java examples
Upload.prototype.createFakeFilesUploadBasic = createFakeFilesUploadBasic;
Upload.prototype.createFakeFilesUploadAutoUploadDisabled = createFakeFilesUploadAutoUploadDisabled;
Upload.prototype.createFakeFilesUploadAllFiles = createFakeFilesUploadAllFiles;
Upload.prototype.createFakeFilesUploadErrorMessagesA = createFakeFilesUploadErrorMessagesA;
Upload.prototype.createFakeFilesUploadErrorMessagesB = createFakeFilesUploadErrorMessagesB;

Upload.prototype.setupMockErrorResponse = function setupMockErrorResponse() {
  // Monkey-patch vaadin-upload instance to use XHRs that always return a mock error response
  (this as any)._createXhr = mockErrorXhrGenerator;
};
