import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  const files = createFakeFiles();

  return (
    <>
      {/* tag::snippet[] */}
      <Upload files={files} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
