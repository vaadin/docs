import { createFakeUploadFiles } from './upload-demo-helpers';

// upload-basic.ts
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

// upload-auto-upload-disabled.ts
export function createFakeFilesUploadAutoUploadDisabled() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
  ]);
}

// upload-all-files.ts
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

// upload-error-messages.ts
export function createFakeFilesUploadErrorMessagesA() {
  return createFakeUploadFiles([{ name: 'Financials.xlsx', error: 'Unexpected Server Error' }]);
}

// upload-error-messages.ts
export function createFakeFilesUploadErrorMessagesB() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: "File couldn't be uploaded, please try again" },
  ]);
}
