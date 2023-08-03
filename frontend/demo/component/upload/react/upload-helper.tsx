import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
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
  const uploadRef = useRef<any>(null);

  useEffect(() => {
    if (uploadRef.current) {
      uploadRef.current.i18n.addFiles.one = 'Upload Spreadsheet...';
      uploadRef.current.i18n.dropFiles.one = 'Drop spreadsheet here';
      uploadRef.current.i18n.error.incorrectFileType =
        'Provide the file in one of the supported formats (.xls, .xlsx, .csv).';
      uploadRef.current.i18n = { ...uploadRef.current.i18n };
    }
  }, []);

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
        ref={uploadRef}
        onFileReject={(event) => {
          Notification.show(event.detail.error);
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
