import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Upload files={createFakeFiles()} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
