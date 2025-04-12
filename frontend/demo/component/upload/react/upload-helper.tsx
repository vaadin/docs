import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  useSignals(); // hidden-source-line
  const maxFileSizeInMB = 1;
  const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
  const acceptedTypes = [
    // Microsoft Excel (.xls)
    'application/vnd.ms-excel',
    '.xls',
    // Microsoft Excel (OpenXML, .xlsx)
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsx',
    // Comma-separated values (.csv)
    'text/csv',
    '.csv',
  ];

  // tag::snippet[]
  const uploadI18n = useSignal({
    addFiles: {
      one: 'Upload Spreadsheet...',
    },
    dropFiles: {
      one: 'Drop spreadsheet here',
    },
    error: {
      incorrectFileType: 'Provide the file in one of the supported formats (.xls, .xlsx, .csv).',
    },
  });

  return (
    <>
      <h4>Upload spreadsheet</h4>
      <p>
        File size must be less than or equal to {maxFileSizeInMB} MB.
        <br />
        Only Excel and CSV files are accepted.
      </p>
      <Upload
        maxFiles={1}
        maxFileSize={maxFileSizeInBytes}
        accept={acceptedTypes.join(',')}
        i18n={uploadI18n.value}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
