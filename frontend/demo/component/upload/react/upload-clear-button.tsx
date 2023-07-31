import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  return <Upload files={createFakeFiles()}></Upload>;
}

export default reactExample(Example);
