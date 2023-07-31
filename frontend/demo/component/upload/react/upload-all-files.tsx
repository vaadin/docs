import React from 'react';
import { css } from '@hilla/react-components/core/css.js';
import { Button } from '@hilla/react-components/Button.js';
import '@hilla/react-components/Upload.js';

class UploadAllFiles extends React.Component {
  uploadRef = React.createRef();

  render() {
    return (
      <>
        {/* tag::snippet[] */}
        <Upload
          ref={(el) => (this.uploadRef.current = el)}
          noAuto
          files={createFakeFilesUploadAllFiles()}
        />

        <Button theme={css`primary`} onClick={() => this.uploadRef.current.uploadFiles()}>
          Upload All Files
        </Button>
        {/* end::snippet[] */}
      </>
    );
  }

  componentDidMount() {
    this.uploadRef.current.i18n = {
      ...this.uploadRef.current.i18n,
      addFiles: { many: 'Select Files...' },
    };
  }
}

export default UploadAllFiles;
